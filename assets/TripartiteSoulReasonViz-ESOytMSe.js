import{j as e}from"./index-j2K7vw2W.js";import{D as r}from"./D3Visualization-CiR6bmyu.js";import"./transform-D71MbgT6.js";const a=()=>{const o=[{id:"reason",name:`Reason
(Logistikon)`,x:200,y:100,color:"#4A90E2"},{id:"spirit",name:`Spirit
(Thymoeides)`,x:100,y:250,color:"#FF6B6B"},{id:"appetite",name:`Appetite
(Epithymetikon)`,x:300,y:250,color:"#50C878"},{id:"goals",name:`Long-term
Goals`,x:200,y:50,color:"#FFD700"},{id:"control",name:`System
Control`,x:200,y:180,color:"#9370DB"}],t=[{source:"reason",target:"goals",value:2},{source:"reason",target:"control",value:2},{source:"control",target:"spirit",value:1},{source:"control",target:"appetite",value:1}];return e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("h3",{style:{color:"#3A3A3A",marginBottom:"1rem"},children:"Reason: The Rational Element"}),e.jsx("div",{style:{height:"300px",width:"100%",marginBottom:"1rem"},children:e.jsx(r,{nodes:o,links:t})}),e.jsx("p",{style:{fontSize:"0.9rem",color:"#666",lineHeight:"1.4"},children:"Reason sets goals, controls Spirit and Appetite, maintains system coherence"})]})};export{a as default};
