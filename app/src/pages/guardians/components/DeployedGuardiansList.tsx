import { MypageTxHistory } from '@anchor-protocol/app-fns';
import { rulerLightColor, rulerShadowColor } from '@libs/styled-neumorphism';
import { useWallet } from '@terra-money/wallet-provider';
import React, { useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { CallMade } from '@material-ui/icons';
import { HorizontalScrollTable } from '@libs/neumorphism-ui/components/HorizontalScrollTable';
import { IconSpan } from '@libs/neumorphism-ui/components/IconSpan';
import { InfoTooltip } from '@libs/neumorphism-ui/components/InfoTooltip';
import { ActionButton } from '@libs/neumorphism-ui/components/ActionButton';

export interface DeployedGuardiansListProps {
  className?: string;
  history: MypageTxHistory[];
  breakpoint?: number;
}

function DeployedGuardiansListBase({
  className,
  history,
  breakpoint = 700,
}: DeployedGuardiansListProps) {
  const { network } = useWallet();
  const handleClick = useCallback((tx_hash: String) => {
    alert(tx_hash);
  }, []);

  return (
    <HorizontalScrollTable minWidth={850}>
      <thead>
        <tr>
          <th>
            <IconSpan>
              Position{' '}
              <InfoTooltip>Availible Positions in your Wallet</InfoTooltip>
            </IconSpan>
          </th>
          <th>
            <IconSpan>Guard Value (Ust)</IconSpan>
          </th>
          <th>
            <IconSpan>
              Unwind Strategy
              <InfoTooltip>
                Describes how the position is used in case the LTV drops to low
              </InfoTooltip>
            </IconSpan>
          </th>
          <th>Priority</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {history.map(({ descriptions, timestamp, tx_hash, tx_type }, i) => {
          const datetime = new Date(timestamp);
          return (
            <tr key={'txhistory' + tx_hash + '_' + i}>
              <td>
                <p>500</p>
                <p>mBTC/UST</p>
                <p>Mirror</p>
              </td>
              <td>
                <time>
                  {datetime.toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                  {', '}
                  <span className="time">
                    {datetime.toLocaleTimeString('en-US')}
                  </span>
                </time>
              </td>
              <td>
                <a
                  href={`https://finder.terra.money/${network.chainID}/tx/${tx_hash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>
                    <p>{tx_type}</p>
                    <p>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: descriptions.join('<br/>'),
                        }}
                      />
                      <CallMade style={{ marginLeft: '0.5em' }} />
                    </p>
                  </div>
                </a>
              </td>
              <td>1</td>
              <td>
                <div className="deploy-button">
                  <ActionButton
                    className="proceed"
                    onClick={() => tx_hash && handleClick(tx_hash)}
                  >
                    Change Priority
                  </ActionButton>
                  <ActionButton style={{ minWidth: 120 }}>
                    Withdraw
                  </ActionButton>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </HorizontalScrollTable>
  );
}

const enter = keyframes`
  0% {
    opacity: 0;
    background-color: rgba(255, 255, 255, 0.7);
  }
  
  100% {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0);
  }
`;

export const StyledDeployedGuardiansList = styled(DeployedGuardiansListBase)`
  padding: 0;
  list-style: none;

  letter-spacing: -0.03em;

  li {
    animation: ${enter} 0.3s ease-in-out;
    width: 100%;
    padding: 10px 0;
    min-height: 90px;
    display: flex;
    align-items: center;

    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.hoverBackgroundColor};
    }

    &:not(:first-child) {
      border-top: 1px solid
        ${({ theme }) =>
          rulerLightColor({
            intensity: theme.intensity,
            color: theme.sectionBackgroundColor,
          })};
    }

    &:not(:last-child) {
      border-bottom: 1px solid
        ${({ theme }) =>
          rulerShadowColor({
            intensity: theme.intensity,
            color: theme.sectionBackgroundColor,
          })};
    }

    > a {
      text-decoration: none;
      color: ${({ theme }) => theme.textColor};

      flex: 1;

      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;

      padding: 12px 0;

      p:nth-child(1) {
        font-size: 13px;
        color: ${({ theme }) => theme.dimTextColor};
      }

      p:nth-child(2) {
        font-size: 14px;

        word-break: break-all;
        white-space: break-spaces;

        svg {
          color: ${({ theme }) => theme.dimTextColor};
          font-size: 1em;
          vertical-align: bottom;
        }
      }

      time {
        font-size: 12px;
        color: ${({ theme }) => theme.dimTextColor};

        word-break: keep-all;
        white-space: nowrap;
      }

      sub {
        color: ${({ theme }) => theme.dimTextColor};
        font-size: max(0.8em, 12px);
        vertical-align: unset;
      }
    }
  }

  &[data-break='true'] {
    li {
      > a {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        time {
          margin-top: 1ex;
        }
      }
    }
  }
`;

export const DeployedGuardiansList = StyledDeployedGuardiansList;
