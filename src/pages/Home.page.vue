<template>
    <div v-if="user">Hello {{user.first_name}},</div>
    <div class="content">
        <Listbox class="robot-list" v-if="robots" v-model="selectedRobot" :options="robots"
                 optionLabel="name">
            <template #option="slotProps">
                <div class="robot-item" @click="getSelectedRobotData(slotProps.option)">
                    <i class="icon mdi mdi-robot"></i>
                    <div class="robot-item-text">
                        <div>{{slotProps.option.name}}</div>
                    </div>
                </div>
                <span class="ripple" :class="{'active': selectedRobot===slotProps.option}"></span>
            </template>
        </Listbox>
        <TabView v-if="selectedRobot">
            <TabPanel>
                <template #header>
                    <i class="icon mdi mdi-map"></i>
                    <span>Map</span>
                </template>
                <RobotMapsAccordion v-if="robotMaps" :maps="robotMaps"></RobotMapsAccordion>
                <div v-else>No maps available</div>
            </TabPanel>
            <TabPanel>
                <template #header>
                    <span>Header II</span>
                    <i class="pi pi-user"></i>
                </template>
                Content II
            </TabPanel>
        </TabView>
        <div v-else>Please select a robot</div>
    </div>
</template>

<script>
    import { STATE } from '@/services/api/_privateNeatoData';
    import { authenticate, getNeatoUser, getNeatoRobot, getNeatoRobotMap } from "@/services/api";
    import RobotMapsAccordion from "../components/RobotMapsAccordion.component";
    import { useRoute } from 'vue-router';
import {ref} from 'vue';
    export default {
        name: "Home",
        components: { RobotMapsAccordion },
        async beforeRouteEnter (to, from, next) {
            if (to.hash) {
                const parsedParams = {};
                to.hash.split('&')
                    .map(part => part.replace(/#/, ''))
                    .forEach(param => {
                        const parts = param.split('=');
                        parsedParams[parts[0]] = parts[1];
                    });
                if (parsedParams.access_token && parsedParams.state === STATE) {
                    to.params = { access_token: parsedParams.access_token };
                    next();
                } else {
                    next({ name: 'not-found' });
                }
            } else {
                authenticate();
            }
        },
        setup () {
            const route = useRoute();
            const user = ref(null);
            const robots = ref(null);
            const getUser = async () =>{ user.value = await getNeatoUser(route.params.access_token)};
            const getRobots = async () =>{ robots.value = await getNeatoRobot(route.params.access_token)};
            let robotMaps = ref(null);
            let selectedRobot = ref(null);
            const getSelectedRobotData = async (robot) => {
                if (robot !== selectedRobot.value) {
                    let data = await getNeatoRobotMap(route.params.access_token, robot.serial);
                    robotMaps.value = data["maps"];
                }
                selectedRobot.value = robot;
            };
            getUser();
            getRobots();
            return {
                user,
                robots,
                selectedRobot,
                robotMaps,
                getSelectedRobotData
            };
        }
    };
</script>

<style>
    .content {
        margin-top: 30px;
        display: grid;
        grid-template-columns: 30% auto;
        grid-gap: 30px;
        grid-auto-rows: minmax(100px, auto);
    }

    .p-listbox {
        border: none;
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
        border-radius: 4px;

    }

    .p-listbox-list-wrapper .p-listbox-list .p-listbox-item {
        height: 52px;
        line-height: 52px;
        outline: transparent;
        position: relative;
    }

    .p-listbox-list-wrapper .p-listbox-list .p-listbox-item .robot-item-text {
        border-top: #e6e6e6 solid 1px;
        width: 100%;
        overflow: auto;
    }

    .p-listbox .p-listbox-list .p-listbox-item:focus {
        outline: 0 none;
        outline-offset: 0;
        box-shadow: none;
    }

    .p-listbox-list-wrapper .p-listbox-list .p-listbox-item.p-highlight {
        background: rgba(66, 185, 131, 0.2);
    }

    .p-listbox-list-wrapper .p-listbox-list .p-listbox-item:nth-child(1) .robot-item-text {
        border-top: none;
    }

    .robot-list .robot-item {
        height: 100%;
        display: flex;
        align-items: center;
        text-align: left;
        margin-left: 30px;
        margin-right: 30px;

    }

    .robot-list .robot-item div {
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .robot-list .robot-item .icon {
        color: #42b983;
        font-size: 1.2rem;
        margin: 5px;
        margin-right: 15px;
        background: #2c3e50;
        padding: 0 12px;
        border-radius: 24px;
        height: 43px;
        line-height: 43px;
    }

    .robot-list .ripple.active {
        position: absolute; /* The absolute position we mentioned earlier */
        border-radius: 50%;
        width: 50%;
        transform: scale(0);
        /*transform: scale(0);*/
        top: 10%;
        left: 30%;
        height: 100%;
        animation: ripple 400ms linear;
        background-color: rgba(251, 255, 248, 0.7);
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
</style>