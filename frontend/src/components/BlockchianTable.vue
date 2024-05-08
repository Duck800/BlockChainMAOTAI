<template>
    <table class="blockchain-table">
        <thead>
            <tr>
                <th>序号</th>
                <th>生产商</th>
                <th>生产地点</th>
                <th>负责人</th>
                <th>时间戳</th>
                <th>哈希值</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="block in filteredChain" :key="block.index">
                <td>{{ block.index }}</td>
                <td>{{ block.data.producer }}</td>
                <td>{{ block.data.location }}</td>
                <td>{{ block.data.responsiblePerson }}</td>
                <td>{{ block.timestamp }}</td>
                <td>{{ block.hash }}</td>
                <td>
                    <button @click="editBlock(block)" class="edit-button">编辑</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
    filteredChain: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['editBlock'])

const editBlock = (block) => {
    //传递给父组件
    emit('editBlock', block.index)
};
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
</style>