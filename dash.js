const style=document.querySelector("#cursor");
const style0=document.querySelector("#dcursor");
const toggle=document.querySelector("#tproducts");
style.addEventListener('click',()=>{
    style0.style.display='inline';
    style.style.display='none';
    toggle.style.display='inline';
});
style0.addEventListener('click',()=>{
    style0.style.display='none';
    style.style.display='inline';
    toggle.style.display='none';
});

const style1=document.querySelector("#cursor1");
const st=document.querySelector("#dcursor1");
const toggle1=document.querySelector("#ttrade");
style1.addEventListener('click',()=>{
    st.style.display='inline';
    style1.style.display='none';
    toggle1.style.display='inline';
});
st.addEventListener('click',()=>{
    st.style.display='none';
    style1.style.display='inline';
    toggle1.style.display='none';
});


const style3=document.querySelector("#cursor3");
const st2=document.querySelector("#dcursor3")
const toggle3=document.querySelector("#tpeople");
style3.addEventListener('click',()=>{
    st2.style.display='inline';
    style3.style.display='none';
    toggle3.style.display='inline';
});
st2.addEventListener('click',()=>{
    st2.style.display='none';
    style3.style.display='inline';
    toggle3.style.display='none';
});

const style4=document.querySelector("#cursor4");
const st3=document.querySelector("#dcursor4");
const toggle4=document.querySelector("#tusers");
style4.addEventListener('click',()=>{
    st3.style.display='inline';
    style4.style.display='none';
    toggle4.style.display='inline';
});
st3.addEventListener('click',()=>{
    st3.style.display='none';
    style4.style.display='inline';
    toggle4.style.display='none';
});

const style5=document.querySelector("#cursor5");
const st5=document.querySelector("#dcursor5");
const toggle5=document.querySelector("#tware");
style5.addEventListener('click',()=>{
    st5.style.display='inline';
    style5.style.display='none';
    toggle5.style.display='inline';
});
st5.addEventListener('click',()=>{
    st5.style.display='none';
    style5.style.display='inline';
    toggle5.style.display='none';
});




const notify=document.querySelector("#notify");
const notifyd=document.querySelector("#notify1");
 notify.addEventListener('click',()=>{
   notifyd.style.display='inline';
   notify.style.display='none';
 })
 notifyd.addEventListener('click',()=>{
    notifyd.style.display='none';
   notify.style.display='inline'; 
 })
