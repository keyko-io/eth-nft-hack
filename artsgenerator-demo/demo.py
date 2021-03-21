from datetime import datetime
import time

from nevermined_sdk_py import Config, Nevermined
from nevermined_sdk_py.nevermined.keeper import NeverminedKeeper as Keeper
from contracts_lib_py.account import Account
from common_utils_py.agreements.service_types import ServiceTypesIndices

PROVIDER_ADDRESS = "0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0"
PROVIDER_PASSWORD = "secret"
PROVIDER_KEYFILE = "./resources/accounts/provider.json"
CONFIG_FILE = "./config.ini"


def date_now():
    return datetime.utcnow().isoformat(timespec="seconds") + "Z"


def wait_for_event(keeper, service_agreement_id):
    event = keeper.lock_reward_condition.subscribe_condition_fulfilled(
        service_agreement_id, 60, None, (), wait=True
    )
    assert event is not None, "Reward condition is not found"


def demo():
    nevermined = Nevermined(Config(CONFIG_FILE))
    provider_account = Account(PROVIDER_ADDRESS, PROVIDER_PASSWORD, PROVIDER_KEYFILE)

    # publish asset
    metadata_compute = {
        "main": {
            "name": "CIFAR-10 Part 1",
            "dateCreated": date_now(),
            "author": "Nevermined Provider",
            "license": "",
            "price": "1",
            "files": [
                {
                    "index": 0,
                    "contentType": "image/png",
                    "checksum": "0x52b5c93b82dd9e7ecc3d9fdf4755f7f69a54484941897dc517b4adfe3bbc3377",
                    "checksumType": "MD5",
                    "contentLength": "12057507",
                    "url": "https://ck2a37sxobgcdarvr7jewxvrlvde6kehhoy6lmfuks4uabuavtiq.arweave.net/ErQN_ldwTCGCNY_SS16xXUZPKIc7seWwtFS5QAaArNE",
                },
                {
                    "index": 1,
                    "contentType": "application/json",
                    "checksum": "0x52b5c93b82dd9e7ecc3d9fdf4755f7f69a54484941897dc517b4adfe3bbc3377",
                    "checksumType": "MD5",
                    "contentLength": "12057507",
                    "url": "https://raw.githubusercontent.com/keyko-io/eth-nft-hack/rod/artsgenerator-demo/config.json"
                }
            ],
            "type": "dataset",
        }
    }

    ddo_compute = nevermined.assets.create_compute(metadata_compute, provider_account)
    print(f"Published asset with DID: {ddo_compute.did}")

    # publish algorithm
    metadata_algorithm = {
        "main": {
            "name": "Generative artist",
            "dateCreated": date_now(),
            "author": "Gene Kogan",
            "license": "",
            "price": "0",
            # This file will not be used but there is a bug on the sdk that
            # expects a least one file to exist in an algorithm
            "files": [
                 {
                    "index": 0,
                    "contentType": "text/text",
                    "checksum": "0x52b5c93b82dd9e7ecc3d9fdf4755f7f69a54484941897dc517b4adfe3bbc3377",
                    "checksumType": "MD5",
                    "contentLength": "12057507",
                    "url": "https://github.com/nevermined-io/tools/raw/master/README.md",
                },
            ],
            "type": "algorithm",
            "algorithm": {
                "language": "python",
                "format": "py",
                "version": "0.1.0",
                "entrypoint": "pwd && ls -lR && cat /data/inputs/**/config.json && python /nevermined-demo/run.py",
                "requirements": {
                    "container": {
                        "image": "neverminedio/artgenerator",
                        "tag": "latest",
                        "checksum": "sha256:53ad3a03b2fb240b6c494339821e6638cd44c989bcf26ec4d51a6a52f7518c1d",
                    }
                },
            },
        }
    }

    ddo_algorithm = nevermined.assets.create(metadata_algorithm, provider_account)
    print(f"Published algorithm with DID: {ddo_algorithm.did}")

    metadata_workflow = {
        "main": {
            "name": "Mint my NFT",
            "dateCreated": date_now(),
            "author": "Nevermined Consumer",
            "license": "",
            "price": "0",
            "type": "workflow",
            "workflow": {
                "stages": [
                    {
                        "index": 0,
                        "input": [{"index": 0, "id": ddo_compute.did}],
                        "transformation": {"id": ddo_algorithm.did},
                    }
                ]
            },
        }
    }

    ddo_workflow = nevermined.assets.create(metadata_workflow, provider_account)
    print(f"Published workflow with DID: {ddo_workflow.did}")

    # order the asset
    keeper = Keeper.get_instance()

    service_agreement_id = nevermined.assets.order(
        ddo_compute.did,
        ServiceTypesIndices.DEFAULT_COMPUTING_INDEX,
        provider_account,
        provider_account,
    )
    print()
    print("Ordering Data In-Situ Compute")
    print(f"Service Agreement ID: {service_agreement_id}")
    wait_for_event(keeper, service_agreement_id)

    # execute workflow
    execution_id = nevermined.assets.execute(
        service_agreement_id,
        ddo_compute.did,
        ServiceTypesIndices.DEFAULT_COMPUTING_INDEX,
        provider_account,
        ddo_workflow.did,
    )
    print("Firing up the GPUs to mine some Art...")
    print(f"Execution ID: {execution_id}")
    print("This will take a about 1h...")

    print()
    print('Monitoring compute status:')
    # wait for compute job
    outputs_did = None
    while True:
        status = nevermined.assets.compute_status(service_agreement_id, execution_id, provider_account)
        if status["status"] == "Failed":
            raise ValueError("The job failed")
        elif status["status"] == "Succeeded":
            outputs_did = status["did"]
            break

        print(f"{execution_id}: {status['status']}")
        time.sleep(60)

    print(f"Outputs DID: {outputs_did}")

    # download the output assets
    print()
    print('Downloading outputs...')
    nevermined.assets.download(outputs_did, ServiceTypesIndices.DEFAULT_ACCESS_INDEX, provider_account, "./")

    print("Finished!")


if __name__ == "__main__":
    demo()
