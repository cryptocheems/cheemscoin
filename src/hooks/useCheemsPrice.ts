import { ChainId, useEthers } from "@usedapp/core";
import { request, gql } from "graphql-request";
import { useEffect, useMemo, useState } from "react";

async function queryPrice() {
  const query = gql`
    {
      token(id: "0xeaf7b3376173df8bc0c22ad6126943cc8353c1ee") {
        derivedNativeCurrency
      }
    }
  `;

  const r = await request("https://api.thegraph.com/subgraphs/name/1hive/honeyswap-xdai", query);
  return r.token.derivedNativeCurrency;
}

export function useCheemsPrice() {
  const [price, setPrice] = useState(0);
  const { chainId } = useEthers();

  useEffect(() => {
    // if (chainId !== ChainId.Rinkeby) return;
    if (chainId !== ChainId.xDai) return;
    (async () => setPrice(await queryPrice()))();
  }, [chainId]);

  const data = useMemo(() => price, [price]);
  return Number(data);
}
