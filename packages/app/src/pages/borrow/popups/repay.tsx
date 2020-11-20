import React, { useState } from 'react'
import { AddressProviderFromEnvVar } from '../../../anchor-js/address-provider'
import { fabricateRepay } from '../../../anchor-js/fabricators'
import Box from '../../../components/box'
import Button, { ButtonTypes } from '../../../components/button'
import Input from '../../../components/input'
import { ActionContainer } from '../../../containers/action'
import { useWallet } from '../../../hooks/use-wallet'
import { PopupChild } from '../../../layout/popup-container'

interface PopupBorrowRepayProps extends PopupChild {

}

const PopupBorrowRepay: React.FunctionComponent<PopupBorrowRepayProps> = ({
  close
}) => {
  const { address } = useWallet()
  const [repayState, setRepayState] = useState(0.00)

  return (
    <Box>
      <header>
        <dl>
          <dt>Repay</dt>
          <dd>Repay existing UST borrows</dd>
        </dl>
        <p>Borrow APR: 3.19%</p>
      </header>
      <div>
        <section>
          <header>
            Repay Amount
          </header>
          <div>
            <Input
              textRight="UST"
              value={repayState}
              onChange={next => setRepayState(Number.parseFloat(next))}
            />
          </div>
          <footer>
            Total Borrows: 10721UST
          </footer>
        </section>
        <section>
          <header>
            Borrow Limit Used
          </header>
          <div>
            <Input
              textRight="%"
              value={0.00}
              disabled={true}
            />
          </div>
        </section>

        {/* indicator */}
        indicator
      </div>

      <footer>
        <ActionContainer render={execute => (
          <Button
            type={ButtonTypes.PRIMARY}
            disabled={true}
            onClick={() => execute(fabricateRepay({
              address,
              market: 'ust',
              borrower: address,
              amount: repayState,
            })).then(close)}
          >Proceed</Button>
        )}>
        </ActionContainer>
      </footer>
    </Box>
  )
}

export default PopupBorrowRepay