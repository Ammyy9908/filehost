import logo from "../logo.svg"



const Notify = (body,path)=>{
    if('Notification' in window){
        if(Notification.permission ==='granted'){

        let title= "System Message";
        let options = {
          body,
          icon:logo
         }

         let n = new Notification(title,options);

         n.onclick = function(event) {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            window.location.href = path;
          }

         setTimeout(n.close.bind(),2000);

        }
        else{
            Notification.requestPermission().then((result)=>{
                console.log(result);
                let title= "System Message";
        let options = {
          body,
          icon:logo
         }

         let n = new Notification(title,options);

         n.onClick = function(event) {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            window.location.href = path;
          }
         

         setTimeout(n.close.bind(),2000);
            }).catch((e)=>{
                console.log(e);
            })
        }
    }
}

export default Notify;