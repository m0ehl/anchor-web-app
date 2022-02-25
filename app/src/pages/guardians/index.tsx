import { PaddedLayout } from 'components/layouts/PaddedLayout';
import { PageTitle, TitleContainer } from 'components/primitives/PageTitle';
import React from 'react';
import styled from 'styled-components';
import { AvailableGuardians } from './components/AvailableGuardians';
import { DeployedGuardians } from './components/DeployedGuardians';

export interface GuardiansProps {
  className?: string;
}

function GuardiansBase({ className }: GuardiansProps) {
  return (
    <PaddedLayout className={className}>
      <TitleContainer>
        <PageTitle title="GUARDIANS" />
      </TitleContainer>
      <>
        <h2>Available Guardians</h2>
        <p className="description">
          Supported LP and staked tokens found in your Wallet
        </p>
        <AvailableGuardians />
      </>
      <>
        <h2>Deployed Guardians</h2>
        <DeployedGuardians />
      </>
    </PaddedLayout>
  );
}

export const Guardians = styled(GuardiansBase)`
  h2 {
    font-size: 18px;
    font-weight: 700;
    margin-top: 60px;
    margin-bottom: 20px;
  }

  .description {
    margin: 10px 10px 10px 10px;
  }

  .tab {
    margin-top: 60px;
  }
`;
