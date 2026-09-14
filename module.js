"use strict";
const support=require("./module-support");
function create(options){
  options=options||{};const s=options.support||support.create("microphone-protection"),engine=options.engine||require("./runtime/unknown-home-microphone").create();
  function report(){const r=engine.status();return Object.assign(r,{healthy:!r.enabled||r.verified,requires:"Verified voice-service blocking in Privacy Protection when capture blocking is enabled"});}
  async function run(action,args){
    args=args||{};
    if(action==="enable"){s.claim();const saved=s.state();if(saved)engine.change(saved.desired===true);s.save({desired:engine.status().enabled,suspended:false});}
    else if(action==="disable"){s.claim();s.suspend(engine.status().enabled);engine.change(false);}
    else if(action==="reconcile"||action==="maintenance"){s.claim();engine.reconcile();}
    else if(action==="setBlocking"){if(typeof args.enabled!=="boolean")throw Error("Expected enabled boolean");engine.change(args.enabled);s.save({desired:args.enabled});}
    else if(!["status","health"].includes(action))throw Error("Unknown microphone action");
    return report();
  }
  return {run};
}
if(require.main===module)support.main(create);module.exports={create};
