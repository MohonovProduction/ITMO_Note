"use strict";(self["webpackChunkdesign_notes"]=self["webpackChunkdesign_notes"]||[]).push([[863],{458:function(e,t,o){o.d(t,{A:function(){return d}});var a=o(641),s=o(33);const n=["type","disabled"],i={key:0,class:"base-button__icon material-symbols-outlined"};var r={__name:"BaseButton",props:{variant:{type:String,default:"primary",validator:e=>["primary","secondary","outline","danger"].includes(e)},size:{type:String,default:"medium",validator:e=>["small","medium","large"].includes(e)},disabled:{type:Boolean,default:!1},fullWidth:{type:Boolean,default:!1},type:{type:String,default:"button",validator:e=>["button","submit","reset"].includes(e)},icon:{type:String,default:""},iconPosition:{type:String,default:"left",validator:e=>["left","right"].includes(e)}},emits:["click"],setup(e,{emit:t}){const o=e,r=t,l=(0,a.EW)((()=>({"base-button":!0,[`base-button--${o.variant}`]:!0,[`base-button--${o.size}`]:!0,"base-button--disabled":o.disabled,"base-button--full-width":o.fullWidth,[`base-button--icon-${o.iconPosition}`]:o.icon}))),c=e=>{o.disabled||r("click",e)};return(t,o)=>((0,a.uX)(),(0,a.CE)("button",{class:(0,s.C4)(l.value),type:e.type,disabled:e.disabled,onClick:c},[e.icon?((0,a.uX)(),(0,a.CE)("span",i,(0,s.v_)(e.icon),1)):(0,a.Q3)("",!0),(0,a.RG)(t.$slots,"default")],10,n))}},l=o(262);const c=(0,l.A)(r,[["__scopeId","data-v-9983c8ea"]]);var d=c},863:function(e,t,o){o.r(t),o.d(t,{default:function(){return j}});var a=o(641),s=o(33);const n={class:"notes-list"},i={class:"header-container"},r={class:"controls"},l={key:0,class:"loading-status"},c={key:1,class:"error-message"},d={key:2,class:"categories-list"},u={key:3,class:"empty-state"};function g(e,t,o,g,h,p){const C=(0,a.g2)("BaseButton"),y=(0,a.g2)("CategoryFilter"),k=(0,a.g2)("CategoryCard");return(0,a.uX)(),(0,a.CE)("div",n,[(0,a.Lk)("div",i,[t[3]||(t[3]=(0,a.Lk)("h1",null,"Список конспектов",-1)),(0,a.Lk)("div",r,[(0,a.bF)(C,{onClick:p.expandAll,icon:"expand_more"},{default:(0,a.k6)((()=>t[0]||(t[0]=[(0,a.eW)(" Развернуть все ")]))),_:1},8,["onClick"]),(0,a.bF)(C,{onClick:p.collapseAll,icon:"expand_less"},{default:(0,a.k6)((()=>t[1]||(t[1]=[(0,a.eW)(" Свернуть все ")]))),_:1},8,["onClick"]),(0,a.bF)(C,{onClick:p.refreshNotes,icon:"refresh"},{default:(0,a.k6)((()=>t[2]||(t[2]=[(0,a.eW)(" Обновить ")]))),_:1},8,["onClick"]),e.loading?((0,a.uX)(),(0,a.CE)("span",l,"Загрузка...")):(0,a.Q3)("",!0)])]),e.categories.length?((0,a.uX)(),(0,a.Wv)(y,{key:0,onCategoryChange:p.handleCategorySelect},null,8,["onCategoryChange"])):(0,a.Q3)("",!0),e.error?((0,a.uX)(),(0,a.CE)("div",c," Ошибка загрузки данных: "+(0,s.v_)(e.error),1)):(0,a.Q3)("",!0),e.loading||e.error?(0,a.Q3)("",!0):((0,a.uX)(),(0,a.CE)("div",d,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(p.groupedNotes,((e,t)=>((0,a.uX)(),(0,a.Wv)(k,{key:e.name,category:e,"is-open":p.isCategoryOpen(t),onToggle:e=>p.toggleCategory(t),onNoteClick:p.handleNoteClick},null,8,["category","is-open","onToggle","onNoteClick"])))),128))])),e.loading||p.groupedNotes.length?(0,a.Q3)("",!0):((0,a.uX)(),(0,a.CE)("div",u,[t[5]||(t[5]=(0,a.eW)(" Нет доступных конспектов ")),(0,a.bF)(C,{onClick:p.refreshNotes,icon:"refresh"},{default:(0,a.k6)((()=>t[4]||(t[4]=[(0,a.eW)("Попробовать снова")]))),_:1},8,["onClick"])]))])}var h=o(278),p=o(458),C=o(751);const y={class:"category-card"},k={class:"header-right"},m={class:"note-count"},f={class:"material-symbols-outlined toggle-icon"},v={key:0,class:"notes-grid"};function b(e,t,o,n,i,r){const l=(0,a.g2)("NoteCard");return(0,a.uX)(),(0,a.CE)("div",y,[(0,a.Lk)("div",{class:"category-header",onClick:t[0]||(t[0]=t=>e.$emit("toggle"))},[(0,a.Lk)("h2",null,(0,s.v_)(o.category.name||"Без категории"),1),(0,a.Lk)("div",k,[(0,a.Lk)("span",m,(0,s.v_)(o.category.notes.length),1),(0,a.Lk)("span",f,(0,s.v_)(o.isOpen?"expand_more":"chevron_right"),1)])]),(0,a.bF)(C.eB,{name:"slide"},{default:(0,a.k6)((()=>[o.isOpen?((0,a.uX)(),(0,a.CE)("div",v,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(o.category.notes,(t=>((0,a.uX)(),(0,a.Wv)(l,{key:t.id,note:t,onClick:o=>e.$emit("note-click",t)},null,8,["note","onClick"])))),128))])):(0,a.Q3)("",!0)])),_:1})])}const _={class:"note-header"},N={class:"description"},L={class:"meta"},A={class:"date"},X={class:"category-badge"};function E(e,t,o,n,i,r){const l=(0,a.g2)("BaseButton");return(0,a.uX)(),(0,a.CE)("div",{class:"note-card",onClick:t[0]||(t[0]=t=>e.$emit("click"))},[(0,a.Lk)("div",_,[(0,a.Lk)("h3",null,(0,s.v_)(o.note.title),1),(0,a.bF)(l,{class:"delete-button",onClick:(0,C.D$)(r.handleDelete,["stop"]),disabled:i.isDeleting,icon:"delete"},null,8,["onClick","disabled"])]),(0,a.Lk)("p",N,(0,s.v_)(o.note.description),1),(0,a.Lk)("div",L,[(0,a.Lk)("span",A,(0,s.v_)(r.formatDate(o.note.date)),1),(0,a.Lk)("span",X,(0,s.v_)(o.note.category),1)])])}var B={name:"NoteCard",components:{BaseButton:p.A},props:{note:{type:Object,required:!0}},data(){return{isDeleting:!1}},methods:{...(0,h.i0)("notes",["deleteNote"]),...(0,h.i0)("ui",["addNotification","openAuthModal"]),formatDate(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})},async handleDelete(){if(!this.isDeleting)try{this.isDeleting=!0,await this.deleteNote(this.note.id),this.addNotification({message:"Заметка успешно удалена",type:"success"})}catch(e){401===e.response?.status?(this.openAuthModal(),this.addNotification({message:"Для удаления заметки необходимо авторизоваться",type:"error"})):this.addNotification({message:"Ошибка при удалении заметки",type:"error"})}finally{this.isDeleting=!1}}}},D=o(262);const w=(0,D.A)(B,[["render",E],["__scopeId","data-v-2b778513"]]);var F=w,W={name:"CategoryCard",components:{NoteCard:F},props:{category:{type:Object,required:!0},isOpen:{type:Boolean,default:!1}}};const $=(0,D.A)(W,[["render",b],["__scopeId","data-v-29a9d391"]]);var O=$;const I={class:"category-filter"},S=["value"];function P(e,t,o,n,i,r){return(0,a.uX)(),(0,a.CE)("div",I,[(0,a.bo)((0,a.Lk)("select",{"onUpdate:modelValue":t[0]||(t[0]=e=>i.selectedCategory=e),class:"category-filter__select",onChange:t[1]||(t[1]=(...e)=>r.handleCategoryChange&&r.handleCategoryChange(...e))},[t[2]||(t[2]=(0,a.Lk)("option",{value:""},"Все категории",-1)),((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(e.categories,(e=>((0,a.uX)(),(0,a.CE)("option",{key:e.id,value:e.name},(0,s.v_)(e.name),9,S)))),128))],544),[[C.u1,i.selectedCategory]])])}var Q={name:"CategoryFilter",data(){return{selectedCategory:""}},computed:{...(0,h.L8)("notes",["categories"])},methods:{handleCategoryChange(){this.$emit("category-change",this.selectedCategory)}}};const x=(0,D.A)(Q,[["render",P],["__scopeId","data-v-69725db0"]]);var M=x,q={name:"HomeView",components:{BaseButton:p.A,CategoryCard:O,CategoryFilter:M},data(){return{openCategories:[],isAuthModalOpen:!1}},computed:{...(0,h.aH)("notes",["error","loading"]),...(0,h.L8)("notes",["publicNotes","categories"]),...(0,h.L8)("auth",["isAuthenticated"]),groupedNotes(){const e={},t=[];return this.publicNotes.forEach((o=>{const a=o.category||"Без категории";e[a]||(e[a]=[],t.push(a)),e[a].push(o)})),t.map((t=>({name:t,notes:e[t].sort(((e,t)=>new Date(t.date)-new Date(e.date)))})))}},methods:{...(0,h.i0)("notes",["fetchPublicNotes","searchNotesByCategory","fetchCategories"]),async refreshNotes(){try{await this.fetchPublicNotes(),this.groupedNotes.length>0&&0===this.openCategories.length&&(this.openCategories=[0])}catch(e){console.error("Ошибка обновления:",e)}},toggleCategory(e){this.isCategoryOpen(e)?this.openCategories=this.openCategories.filter((t=>t!==e)):this.openCategories.push(e)},isCategoryOpen(e){return this.openCategories.includes(e)},expandAll(){this.openCategories=this.groupedNotes.map(((e,t)=>t))},collapseAll(){this.openCategories=[]},handleNoteClick(e){this.$router.push({name:"note",params:{id:e.id}})},async handleCategorySelect(e){e?await this.searchNotesByCategory(e):await this.fetchPublicNotes()},handleAuthSuccess(){this.isAuthModalOpen=!1}},async created(){await Promise.all([this.fetchPublicNotes(),this.fetchCategories()])},watch:{"$route.query.category"(e){if(e){const t=this.groupedNotes.findIndex((t=>t.name===e));t>=0&&(this.openCategories=[t])}}}};const K=(0,D.A)(q,[["render",g],["__scopeId","data-v-8184bb86"]]);var j=K}}]);
//# sourceMappingURL=863.c9dadcce.js.map