import { User, Works } from "../generated/schema"
import { Coffee, Transfer } from "../generated/Coffee/Coffee";
import { Work } from "../generated/Work/Work";
import { Energy } from "../generated/Energy/Energy";
import { Chocolate } from "../generated/Chocolate/Chocolate";


export function handleTransfer(event: Transfer): void {
    let contract = Work.bind(event.address);

    let u = User.load(event.params.to.toHex())
    if (u == null) {
       
        u = new User(event.params.to.toHex())
     
        u.level = 1;
        u.isworking = false;


    }
    u.work = contract.balanceOf(event.params.to);
    u.save();

    let from = User.load(event.params.from.toHex());
    if (from == null){
        from = new User(event.params.from.toHex())
     
        from.level = 1;
        from.isworking = false;
    }
    from.work = contract.balanceOf(event.params.from);
    from.save();
}
