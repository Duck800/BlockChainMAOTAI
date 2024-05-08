<template>
    <div v-if="props.showModal" class="modal">
        <div class="modal-content">
            <h2>编辑商品信息</h2>
            <form @submit="submitForm" class="form">
                <table class="form-table">
                    <tr>
                        <td><label>生产商:</label></td>
                        <td><input type="text" v-model="editedBlockDataForm.producer" required></td>
                    </tr>
                    <tr>
                        <td><label>生产地点:</label></td>
                        <td><input type="text" v-model="editedBlockDataForm.location" required></td>
                    </tr>
                    <tr>
                        <td><label>负责人:</label></td>
                        <td><input type="text" v-model="editedBlockDataForm.responsiblePerson" required></td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="button-group">
                                <button type="submit" @click="finishForm()">更新</button>
                                <button type="button" @click="closeModal">关闭</button>
                            </div>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const editedBlockDataForm = ref({
    producer: '',
    location: '',
    responsiblePerson: ''
});
const editedBlockIndex = ref(null);

const props = defineProps(['showModal', 'addBlock', 'updateBlock', 'editBlock', 'editedBlockIndex']);

const emit = defineEmits(['closeModal', 'addBlock', 'UpdateBlock'])

const submitForm = (event) => {
    event.preventDefault();
};

const closeModal = () => {
    //传递给父组件
    emit('closeModal')
};

const finishForm = () => {
    const { producer, location, responsiblePerson } = editedBlockDataForm.value;
    if (producer && location && responsiblePerson) {
        const block = {
            producer,
            location,
            responsiblePerson
        };

        //传递给父组件
        if (props.editedBlockIndex)
            emit('updateBlock', block)
        else
            emit('addBlock', block)
    }
};
</script>

<style scoped>
/* 模态框样式 */
.modal {
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

.modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 45%;
    height: 55%;
    background-color: #fff;
    border-radius: 10px;
    z-index: 99;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    color: black;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form {
    width: 100%;
    height: 60%;
}

.form-table {
    width: 100%;
    height: 60%;
}

.form-table input[type="text"] {
    padding: 10px;
    font-size: 16px;
    border-radius: 15px;
    border: 1px solid #ccc;
    width: 70%;
    background-color: white;
    color: black;
}

.button-group {
    margin-top: 40px;
}

.button-group button:first-child {
    background-color: #4caf50;
    color: #fff;
    margin: 10px;
}

.button-group button:last-child {
    background-color: #f44336;
    color: #fff;
    margin: 10px;
}
</style>