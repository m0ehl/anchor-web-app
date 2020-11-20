import { Int, MsgExecuteContract } from "@terra-money/terra.js"
import { AddressProvider } from "../address-provider/types"
import { validateInput } from "../utils/validate-input"
import { validateAddress, validateValAddress } from "../utils/validation/address"
import { validateIsGreaterThanZero } from "../utils/validation/number"

import bAssetToNative from '../constants/basset-to-native.json'

interface Option {
  address: string
  amount: string
  bAsset: string
  validator: string // validator address
}

export const fabricatebAssetMint = (
  { address, amount, bAsset, validator }: Option,
) => (
  addressProvider: AddressProvider.Provider
): MsgExecuteContract[] => {
  validateInput([
    validateAddress(address),
    validateValAddress(validator),
    validateIsGreaterThanZero(amount)
  ])

  const nativeTokenDenom = bAssetToNative[bAsset.toLowerCase()]
  const bAssetContractAddress = addressProvider.bAssetGov(bAsset)
  
  return [
    new MsgExecuteContract(
      address,
      bAssetContractAddress,
      {
        mint: {
          validator // validator must be whitelisted
        }
      },

      // send native token
      {
        [nativeTokenDenom]: new Int(amount).toString()
      }
    ),
  ]
}