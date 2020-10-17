<template>
    <div v-for="m in maps" :key="m.id" class="expandpanel">
        <div @click="expand(m.id)"  class="expandpanel-header" :class="{active:expandedMapId===m.id}">
            <div class="icon chevron mdi mdi-chevron-right"></div>
            <i class="icon mdi mdi-calendar"></i>
           <span>{{new Date(m.start_at).toLocaleDateString()}}</span>
        </div>
        <div v-if="expandedMapId===m.id"  class="expandpanel-content">
            <img class="map-img" :src="m.url">
        </div>
    </div>
</template>

<script>
    import {ref} from 'vue';
    export default {
        name: "RobotMapsAccordion",
        props:{
            maps: Array
        },
        setup(props){
            const expandedMapId = ref(props.maps && props.maps.length > 0 ? (props.maps[0]) : null);
            const expand = (id)=>{
                expandedMapId.value = id;
            };
            return {
                expandedMapId,
                expand
            };
        }
    };
</script>

<style scoped>

    .expandpanel{
        text-align: left;
    }
    .expandpanel-header .icon.chevron{
        font-size: 1.3em;
        -moz-transition: all .2s linear;
        -webkit-transition: all .2s linear;
        transition: all .2s linear;
    }
    .expandpanel-header.active .icon.chevron{
        -ms-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }
    .expandpanel-header{
        font-size: 1.2em;
        background: rgba(169, 169, 169, 0.46);
        border-top: solid grey 1px;
        border-bottom: solid grey 1px;
        display: flex;
        height: 40px;
        line-height: 40px;
    }
.map-img{
    width: 300px;
   height: 300px;
}
</style>