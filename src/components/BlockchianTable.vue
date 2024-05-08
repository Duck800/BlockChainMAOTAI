<template>
    <table class="blockchain-table">
        <thead>
            <tr>
                <th>序号</th>
                <th>生产商</th>
                <th>生产地点</th>
                <th>生产负责人</th>
                <th>生产时间</th>
                <th v-if="props.role == 'carrier' || props.role == 'consumer'">发货地</th>
                <th v-if="props.role == 'carrier' || props.role == 'consumer'">目的地</th>
                <th v-if="props.role == 'carrier' || props.role == 'consumer'">运输员</th>
                <th>防伪码</th>
                <th v-if="props.role != 'consumer'">操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="block in filteredChain" :key="block.index">
                <td>{{ block.index }}</td>
                <td>{{ block.data.producer }}</td>
                <td>{{ block.data.location }}</td>
                <td>{{ block.data.responsiblePerson }}</td>
                <td>{{ block.timestamp }}</td>
                <td v-if="props.role == 'carrier' || props.role == 'consumer'">{{ block.data.carrier.origin }}</td>
                <td v-if="props.role == 'carrier' || props.role == 'consumer'">{{ block.data.carrier.destination }}</td>
                <td v-if="props.role == 'carrier' || props.role == 'consumer'">{{ block.data.carrier.transporter }}</td>
                <td>
                    <b @click="showCode(block.hash)" class="lookup">
                        查看
                    </b>
                </td>
                <td>
                    <button v-if="props.role != 'consumer'" @click="editBlock(block)" class="edit-button">编辑</button>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="overlay" v-if="showPopup">
        <div class="popup">
            <div class="popup-content">
                <h2>防伪码</h2>
                <p>{{ popupCode }}</p>
            </div>
            <button class="close-button" @click="closePopup">关闭</button>
        </div>
    </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue';

const props = defineProps(['filteredChain', 'role']);

const emit = defineEmits(['editBlock'])

const showPopup = ref(false);
const popupCode = ref()

const editBlock = (block) => {
    //传递给父组件
    emit('editBlock', block.index)
};

function showCode(code) {
    popupCode.value = code;
    showPopup.value = true;
}

function closePopup() {
    showPopup.value = false;
    popupCode.value = null;
}
</script>

<style scoped>
.blockchain-table {
    position: absolute;
    top: 25%;
    left: 10%;
    color: black;
    width: 80%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.blockchain-table th,
.blockchain-table td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.blockchain-table th {
    font-weight: bold;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #ffffff;
    color: black;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid black;
}

.lookup {
    color: rgb(0, 0, 125);
    cursor: pointer;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
}

.popup {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    color: black;
}

.close-button {
    background-color: #ccc;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
}

.popup-content {
    margin-top: 20px;
}

.popup-content h2 {
    margin-bottom: 10px;
}
</style>