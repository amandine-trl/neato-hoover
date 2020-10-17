import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
/**Components from primevue ui framework**/
import Listbox from 'primevue/listbox';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';


const app = createApp(App);
app.use(router);
app.component('Listbox', Listbox);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);

app.mount('#app');
