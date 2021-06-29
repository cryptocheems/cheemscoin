import { ChainId, useEthers } from "@usedapp/core";
import { request, gql } from "graphql-request";
import { useEffect, useMemo, useState } from "react";

// https://api.thegraph.com/subgraphs/name/sushiswap/xdai-exchange

// Modelled after https://github.com/1Hive/tulip-frontend/blob/master/src/hooks/usePools.js

async function queryPrice(address: string) {
  const query = gql`
  {
    pair(id:"${address}") {
      totalSupply
      reserveUSD
    }
  }`;

  // TODO: Change url depending on token
  const r = await request("https://api.thegraph.com/subgraphs/name/1hive/honeyswap-xdai", query);
  const usd = Number(r.pair.reserveUSD);
  const supply = Number(r.pair.totalSupply);
  return usd / supply;
}

export function usePrice(address: string) {
  const [price, setPrice] = useState(0);
  const { chainId } = useEthers();

  useEffect(() => {
    if (chainId !== ChainId.Rinkeby) return;
    // TODO: Change to this
    // if (chainId !== ChainId.xDai) return
    (async () => setPrice(await queryPrice(address)))();
  }, [chainId]);

  const data = useMemo(() => price, [price]);
  return data;
}
