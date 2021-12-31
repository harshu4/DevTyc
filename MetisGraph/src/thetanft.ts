import { BigInt } from "@graphprotocol/graph-ts"
import {
  mintnft,
  buynft,
  setprice
} from "../generated/ThetaNFT/ThetaNFT"
import { User,NFT,Event } from "../generated/schema"
import { Transfer } from "../generated/Nftcontract/Nftcontract"

export function handlemint(event: mintnft): void {
    let n = new NFT(event.params.tokenid.toString())
    let u = User.load(event.params.owner.toHex())
   
    if (u==null){
      u = new User(event.params.owner.toHex())
      
    }
    n.owner = event.params.owner.toHex();
    n.url = event.params.uri.toString();
    n.event = event.params.nftevent.toString();
    n.price= event.params.pricenft;
    n.forsale= true 
    u.save()
    n.save()
    

    
    
}

export function handlebuynft(event:buynft):void{
    let n = NFT.load(event.params.tokenid.toString())
    let u = User.load(event.params.buyer.toHex())
    if (u==null){
        u = new User(event.params.buyer.toHex())
        
      }
    if(n!=null){
    n.owner = event.params.buyer.toHex()
    n.forsale = false;
    u.save()
    n.save()
    }

}

export function handlesetprice(event:setprice):void{
    let n =  NFT.load(event.params.tokenid.toString())
    if(n!= null){
    n.price = event.params.price
    n.forsale = true
    n.save()
    }

}

export function handleTransfer(event:Transfer):void{
  let n = NFT.load(event.params.tokenId.toString())
  let u = User.load(event.params.to.toHex())
   
  if (u==null){
    u = new User(event.params.to.toHex())
    
  }
  if(n!=null){
  
  n.owner = event.params.to.toHex();
  n.save()
  u.save()
  }

}