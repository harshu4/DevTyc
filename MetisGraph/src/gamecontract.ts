import { BigInt } from "@graphprotocol/graph-ts"
import {
    AskWork,
    TakeWork,
    CompleteWork,
    UpgradeComputer,
    faucet
} from "../generated/Gamecontract/Gamecontract"
import { User, Works } from "../generated/schema"
import { Coffee, Transfer } from "../generated/Coffee/Coffee";
import { Work } from "../generated/Work/Work";
import { Energy } from "../generated/Energy/Energy";
import { Chocolate } from "../generated/Chocolate/Chocolate";



export function handleaskwork(event: AskWork): void {
    let u = User.load(event.params.worker.toHex())
    
    if (u == null) {
       
        u = new User(event.params.worker.toHex())
   
        u.computerlevel = 0;
        u.level = 1;
        u.isworking = false;


    }
    u.currentworkint = event.params.workid
    u.level = u.level+1;
    let wid = event.params.worker.toHexString() + "-" + event.params.workid.toString()
    let w = new Works(wid);
    w.givenblock = event.params.givenblock;
    w.reward = event.params.reward;
    w.totalblock = event.params.totalblock;
    w.started = false;
   
    w.notcompleted = true;
    w.owner = event.params.worker.toHex();
    w.save();
    u.save();

}

export function handletakework(event: TakeWork): void {
    let u = User.load(event.params.worker.toHex())
    if (u != null) {

        u.currentworkint = event.params.workid
        let wid = event.params.worker.toHexString() + "-" + event.params.workid.toString()
        let w = Works.load(wid);
        if (w != null) {
            w.startblock = event.params.startblock;
            w.endblock = event.params.endblock;
            w.started = true;
          
            u.isworking = true;
            u.save();
            w.save();
        }
    }
}

export function handlecompletework(event: CompleteWork): void {
    let u = User.load(event.params.worker.toHex())
    if (u != null) {

        u.currentworkint =event.params.workid
        let wid = event.params.worker.toHexString()     + "-" + event.params.workid.toString()
        let w = Works.load(wid);
       
        if (w != null) {
            w.notcompleted = false

            u.save();
            w.save();
        }
    }
}

export function handleupgradecomp(event: UpgradeComputer): void {
    let u = User.load(event.params.worker.toHex())
    
    if (u == null) {
       
        u = new User(event.params.worker.toHex())
     
        u.computerlevel = 0;
      
        u.level = 1;
        u.isworking = false;


    }
    if (u!=null){
    u.computerlevel++;

    }
    u.save();

}
export function handlefaucet(event: faucet): void {
    let u = User.load(event.params.worker.toHex())
    
    if (u == null) {
       
        u = new User(event.params.worker.toHex())
     
        u.computerlevel = 0;
      
        u.level = 1;
        u.isworking = false;
        u.faucet = true;


    }
    if (u!=null){
    u.faucet = true;

    }
    u.save();

}




/**
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
 */