import{r as x,j as e,g as b}from"./main-DlrAUet3.js";import{d as r,S as C}from"./shared-Bb7SbMXN.js";const l=r.div`
  height: 1rem;
  background: #eee;
  border-radius: 4px;
  width: ${t=>t.width||"100%"};
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`,F=r.div`
  width: 64px;
  height: 64px
  border-radius: 50%;
  background: #eee;
  animation: pulse 1.5s infinite;
`,E=r.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #ccc;
  margin: 0 auto 8px;
  `,S=r.div`
  margin-bottom: 12px;
`,I=r.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`,P=r.div`
    font-size: 12px;
    color: #888;
    text-align: center;
`,z=r.div`
  font-weight: bold;
  font-size: 16px;
  margin: 12px 0 6px;
`,a=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;
`,c=r.div`
  flex: 0 0 50%;
  font-weight: lighter;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;`,d=r.div`
  flex: 0 0 50%;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;r.div`
  background: #f7f7f7;
  border-radius: 6px;
  padding: 10px;
  margin: 8px 0;
`;r.div`
  font-size: 12px;
  color: #999;
`;r.div`
  font-size: 16px;
  font-weight: bold;
`;const g=r.button`
  border: 1px solid #A259FF;
  background: #7d5bbe;
  color: white;
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 12px;

  &:hover {
    background:rgba(181, 125, 240, 0.83);
  }
`,L=r.button`
  border: 1px solid #A259FF;
  background: #f1e1d0;
  color: #7d5bbe;
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 8px;

  &:hover {
    background: #f3e8ff;
  }
`,W=r.div`
  text-align: center;
  font-size: 10px;
  color: #aaa;
  margin-top: 16px;
`,A=()=>{const[t,f]=x.useState(null),[s,p]=x.useState(!1),[n,u]=x.useState(null);x.useEffect(()=>{(async()=>{const h=b(),v=await(await fetch(`/api/user?userId=${h}`)).json();f(v),u(v)})()},[]);const j=i=>i?new Date(i).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"}):"—",w=()=>{window.open("https://natarelke.io/oferta.pdf","_blank")},m=()=>{p(!0)},k=async()=>{if(n)try{const i=b();if(!(await fetch("/api/user/update",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:i,...n})})).ok)throw new Error("Ошибка сохранения");f(n),p(!1)}catch(i){console.error("Ошибка:",i)}},y=()=>{p(!1),u(t)},o=(i,h)=>{n&&u({...n,[i]:h})};return e.jsxs(C,{children:[e.jsxs(S,{children:[t?e.jsx(E,{}):e.jsx(F,{}),e.jsx("div",{className:"flex-1 min-w-0",children:t?e.jsxs(e.Fragment,{children:[e.jsxs(I,{children:[t.firstName," ",t.lastName]}),e.jsxs(P,{children:["Подписка — до ",j(t.subscriptionExpiry)]})]}):e.jsx(e.Fragment,{})})]}),e.jsx(z,{children:"Информация о клиенте"}),e.jsxs(a,{children:[e.jsx(c,{children:"🎂 Дата рождения"}),t?s?e.jsx("input",{type:"date",value:(n==null?void 0:n.birthDate)||"",onChange:i=>o("birthDate",i.target.value)}):e.jsx(d,{children:j(t.birthDate)}):e.jsx(l,{width:"50%"})]}),e.jsxs(a,{children:[e.jsx(c,{children:"⚧️ Пол"}),t?s?e.jsxs("select",{value:(n==null?void 0:n.gender)||"",onChange:i=>o("gender",i.target.value),children:[e.jsx("option",{value:"Мужской",children:"Мужской"}),e.jsx("option",{value:"Женский",children:"Женский"})]}):e.jsx(d,{children:t.gender}):e.jsx(l,{width:"50%"})]}),e.jsxs(a,{children:[e.jsx(c,{children:"🎯 Цель"}),t?s?e.jsxs("select",{value:(n==null?void 0:n.goal)||"",onChange:i=>o("goal",i.target.value),children:[e.jsx("option",{value:"Похудение",children:"Похудение"}),e.jsx("option",{value:"Набор массы",children:"Набор массы"}),e.jsx("option",{value:"Поддержание веса",children:"Поддержание веса"})]}):e.jsx(d,{children:t.goal}):e.jsx(l,{width:"50%"})]}),e.jsxs(a,{children:[e.jsx(c,{children:"🏃‍♂️ Уровень активности"}),t?s?e.jsxs("select",{value:(n==null?void 0:n.activityLevel)||"",onChange:i=>o("activityLevel",i.target.value),children:[e.jsx("option",{value:"Сидячий образ жизни",children:"Сидячий образ жизни"}),e.jsx("option",{value:"Лёгкая активность",children:"Лёгкая активность"}),e.jsx("option",{value:"Умеренная активность",children:"Умеренная активность"}),e.jsx("option",{value:"Высокая активность",children:"Высокая активность"}),e.jsx("option",{value:"Очень высокая активность",children:"Очень высокая активность"})]}):e.jsx(d,{children:t.activityLevel}):e.jsx(l,{width:"50%"})]}),e.jsxs(a,{children:[e.jsx(c,{children:"⚖️ Текущий вес"}),t?s?e.jsx("input",{type:"number",value:(n==null?void 0:n.currentWeight)||"",onChange:i=>o("currentWeight",parseFloat(i.target.value))}):e.jsxs(d,{children:[t.currentWeight," кг"]}):e.jsx(l,{width:"50%"})]}),e.jsxs(a,{children:[e.jsx(c,{children:"🥇 Желаемый вес"}),t?s?e.jsx("input",{type:"number",value:(n==null?void 0:n.desiredWeight)||"",onChange:i=>o("desiredWeight",parseFloat(i.target.value))}):e.jsxs(d,{children:[t.desiredWeight," кг"]}):e.jsx(l,{width:"50%"})]}),e.jsxs(a,{children:[e.jsx(c,{children:"📏 Рост"}),t?s?e.jsx("input",{type:"number",value:(n==null?void 0:n.height)||"",onChange:i=>o("height",parseFloat(i.target.value))}):e.jsxs(d,{children:[t.height," см"]}):e.jsx(l,{width:"50%"})]}),t&&e.jsxs(e.Fragment,{children:[s?e.jsxs(e.Fragment,{children:[e.jsx(g,{onClick:k,children:"Сохранить"}),e.jsx(g,{onClick:y,children:"Отмена"})]}):e.jsx(g,{onClick:m,children:"Изменить данные"}),e.jsx(L,{onClick:w,children:"Оферта"}),e.jsx(W,{children:"Powered by Fit&Pink"})]})]})};export{A as P};
