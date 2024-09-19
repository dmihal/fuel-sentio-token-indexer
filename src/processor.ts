import { Counter } from '@sentio/sdk'
import { FuelGlobalProcessor, FuelNetwork } from '@sentio/sdk/fuel'
import { InputType, OutputType, Input, bn, ReceiptType } from 'fuels';

FuelGlobalProcessor
.bind({ chainId: FuelNetwork.MAIN_NET })
.onTransaction(
  async (tx, ctx) => {
    for (const receipt of tx.receipts) {
      if (receipt.type === ReceiptType.Mint) {
        ctx.eventLogger.emit('Mint', {
          assetId: receipt.assetId,
          contractId: receipt.contractId,
          subId: receipt.subId,
        });
      }
    }
  });
