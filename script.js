const $=i=>document.getElementById(i);
let reportText="";
function wd(d){return["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][d.getDay()]}
$('calc').onclick=()=>{
 const name=$('name').value||"Friend";
 const v=$('dob').value;
 if(!v){alert("Select DOB");return;}
 const dob=new Date(v+"T00:00:00"),now=new Date();
 let y=now.getFullYear()-dob.getFullYear();
 let m=now.getMonth()-dob.getMonth();
 let d=now.getDate()-dob.getDate();
 if(d<0){d+=new Date(now.getFullYear(),now.getMonth(),0).getDate();m--;}
 if(m<0){m+=12;y--;}
 const total=Math.floor((now-dob)/86400000);
 let next=new Date(now.getFullYear(),dob.getMonth(),dob.getDate());
 if(next<now)next.setFullYear(next.getFullYear()+1);
 const remain=Math.ceil((next-now)/86400000);
 reportText=`Age Calculator AI

Name: ${name}
Birthday: ${wd(dob)}
Age: ${y} Years ${m} Months ${Math.floor(d/7)} Weeks ${d%7} Days

Next Birthday: ${wd(next)}
Remaining Days: ${remain}

Total Days: ${total}
Total Weeks: ${Math.floor(total/7)}
Total Months: ${y*12+m}
Total Hours: ${total*24}
Total Minutes: ${total*1440}
Total Seconds: ${total*86400}`;
 $('report').innerHTML="<pre>"+reportText+"</pre>";
};
$('copy').onclick=async()=>{
 if(!reportText){alert("Calculate first");return;}
 await navigator.clipboard.writeText(reportText);
 alert("Copied");
};
$('download').onclick=()=>{
 if(!reportText){alert("Calculate first");return;}
 const blob=new Blob([reportText],{type:"text/plain"});
 const a=document.createElement("a");
 a.href=URL.createObjectURL(blob);
 a.download="AgeReport.txt";
 a.click();
 URL.revokeObjectURL(a.href);
};
