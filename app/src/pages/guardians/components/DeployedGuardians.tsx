import { Section } from '@libs/neumorphism-ui/components/Section';
import React from 'react';
import styled from 'styled-components';
import { useGuardianQuery } from '@anchor-protocol/app-provider';
import { DeployedGuardiansList } from './DeployedGuardiansList';

export interface DeployedGuardiansProps {
  className?: string;
}

export function DeployedGuardiansBase({ className }: DeployedGuardiansProps) {
  // const { history, isLast, loadMore, inProgress } = useMypageTxHistoryQuery();
  const { history, inProgress, isConnected } = useGuardianQuery();

  // ---------------------------------------------
  // presentation
  // ---------------------------------------------
  return (
    <section className={className}>
      <Section>
        {!isConnected && (
          <div className={className}>
            <h3>Wallet not connected</h3>
            <p>Looks like you haven't connected your wallet yet.</p>
          </div>
        )}

        {/* {isConnected && (<HorizontalScrollTable >
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
                    Describes how the position is used in case the LTV drops to
                    low
                  </InfoTooltip>
                </IconSpan>
              </th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>500</p>
                <p>mBTC/UST</p>
                <p>Mirror</p>
              </td>
              <td>20000 UST</td>
              <td>
                <p>Withdraw LP repay loan with UST part.</p>
                <p> Send other Side back to your wallet</p>
              </td>
              <td>1</td>
              <td>                <div className="deploy-button">
                <ActionButton style={{ minWidth: 120 }}>
                  Change Priority
                </ActionButton>
                <ActionButton style={{ minWidth: 120 }}>
                  Withdraw
                </ActionButton>
              </div></td>
            </tr>
            <tr>
              <td>
                <p>10.000</p>
                <p>aUST</p>
                <p>Anchor</p>
              </td>
              <td>11000 UST</td>
              <td>
                <p>Unstake aUST and use UST to repay loan</p>
              </td>
              <td>2</td>
              <td>
                <div className="deploy-button">
                  <ActionButton style={{ minWidth: 120 }}>
                    Change Priority
                  </ActionButton>
                  <ActionButton style={{ minWidth: 120 }}>
                    Withdraw
                  </ActionButton>
                </div></td>
            </tr>
          </tbody>
        </HorizontalScrollTable>
        )} */}

        {isConnected && !inProgress && history.length > 0 && (
          <DeployedGuardiansList history={history} />
        )}
      </Section>
    </section>
  );
}

export const DeployedGuardians = styled(DeployedGuardiansBase)`
  // ---------------------------------------------
  // style
  // ---------------------------------------------
  tbody {
    td {
      font-size: 12px;
      letter-spacing: -0.3px;
    }
  }
  .deploy-button {
    display: flex;
    gap: 10px;
    button {
      height: 48px;
      border-radius: 26px;
    }
  }
`;
