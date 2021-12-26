import { BigInt } from "@graphprotocol/graph-ts"
import {
  mintnft
} from "../generated/Nftcontract/Nftcontract"
import { User,NFT,Event } from "../generated/schema"




export function handlemintnft(event: mintnft): void {
let n = new Event(event.params.tokenid.toString())
let u = User.load(event.params.owner.toHex())
if (u==null){
  u = new User(event.params.owner.toHex())
  
}
n.owner = event.params.owner.toHex();
n.idString = event.params.id.toString();
n.url = event.params.uri.toString();
n.save()
u.save()


}
