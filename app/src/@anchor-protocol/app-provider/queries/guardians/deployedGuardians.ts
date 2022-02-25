import {
  MypageTxHistory,
  mypageTxHistoryQuery,
} from '@anchor-protocol/app-fns';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useCallback, useEffect, useState } from 'react';
import { useAnchorWebapp } from '../../contexts/context';

interface TxHistoryReturn {
  history: MypageTxHistory[];
  // isLast: boolean;
  // loadMore: () => void;
  // reload: () => void;
  inProgress: boolean;
  isConnected: boolean;
}

export function useGuardianQuery(): TxHistoryReturn {
  const connectedWallet = useConnectedWallet();

  const { indexerApiEndpoint: endpoint } = useAnchorWebapp();

  const [history, setHistory] = useState<MypageTxHistory[]>([]);

  const [inProgress, setInProgress] = useState<boolean>(true);

  const [isConnected, setIsConnected] = useState<boolean>(true);

  const load = useCallback(() => {
    // initialize data
    setHistory([]);

    if (!connectedWallet) {
      setInProgress(false);
      setIsConnected(false);
      return;
    } else {
      setIsConnected(true);
    }

    setInProgress(true);

    mypageTxHistoryQuery({
      endpoint,
      walletAddress: 'terra1vz0k2glwuhzw3yjau0su5ejk3q9z2zj4ess86s',
      //walletAddress: connectedWallet.walletAddress,
      offset: null,
    })
      .then(({ history, next }) => {
        setInProgress(false);
        setHistory(history);
      })
      .catch((error) => {
        console.error(error);
        setHistory([]);
        setInProgress(false);
      });
  }, [connectedWallet, endpoint]);

  // const loadMore = useCallback(() => {
  //   if (history.length > 0 && !!next && connectedWallet) {
  //     setInProgress(true);

  //     mypageTxHistoryQuery({
  //       endpoint,
  //       walletAddress: 'terra1vz0k2glwuhzw3yjau0su5ejk3q9z2zj4ess86s',
  //       //walletAddress: connectedWallet.walletAddress,
  //       offset: next,
  //     }).then(({ history, next }) => {
  //       setHistory((prev) => {
  //         return Array.isArray(history) && history.length > 0
  //           ? [...prev, ...history]
  //           : prev;
  //       });

  //       setNext(next);

  //       setInProgress(false);
  //     });
  //   }
  // }, [connectedWallet, endpoint, history.length, next]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    history,
    // isLast: !next,
    // reload: load,
    // loadMore,
    inProgress,
    isConnected,
  };
}
