import { ChainId, useEthers } from "@usedapp/core";
import { request, gql } from "graphql-request";
import { useEffect, useMemo, useState } from "react";
import { graphDetails } from "../constants";

// Modelled after https://github.com/1Hive/tulip-frontend/blob/master/src/hooks/usePools.js

async function queryPrice(address: string) {
  const graph = graphDetails(address);
  const query = gql`
  {
    pair(id:"${graph.address.toLowerCase()}") {
      totalSupply
      reserveUSD
    }
  }`;

  const r = await request(graph.url, query);

  if (r.pair === null) return 0;

  const usd = Number(r.pair.reserveUSD);
  const supply = Number(r.pair.totalSupply);
  return usd / supply;
}

export function usePrice(address: string) {
  const [price, setPrice] = useState(0);
  const { chainId } = useEthers();

  useEffect(() => {
    // if (chainId !== ChainId.Rinkeby) return;
    if (chainId !== ChainId.xDai) return;
    (async () => setPrice(await queryPrice(address)))();
  }, [chainId]);

  const data = useMemo(() => price, [price]);
  return data;
}
