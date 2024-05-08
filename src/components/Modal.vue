<template>
    <div v-if="props.showModal" class="modal">
        <div class="modal-content">
            <h2>编辑商品信息</h2>
            <form @submit="submitForm" class="form">
                <table class="form-table">
                    <tr>
                        <td>
                            <label v-if="props.role == 'producer'">生产商:</label>
                            <label v-if="props.role == 'carrier'">发货地:</label>
                        </td>
                        <td>
                            <input v-if="props.role == 'producer'" type="text" v-model="editedBlockDataForm.producer"
                                required>
                            <input v-if="props.role == 'carrier'" type="text"
                                v-model="editedBlockDataForm.carrier.origin" required>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label v-if="props.role == 'producer'">生产地点:</label>
                            <label v-if="props.role == 'carrier'">目的地:</label>
                        </td>
                        <td>
                            <input v-if="props.role == 'producer'" type="text" v-model="editedBlockDataForm.location"
                                required>
                            <input v-if="props.role == 'carrier'" type="text"
                                v-model="editedBlockDataForm.carrier.destination" required>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label v-if="props.role == 'producer'">负责人:</label>
                            <label v-if="props.role == 'carrier'">运输员:</label>
                        </td>
                        <td>
                            <input v-if="props.role == 'producer'" type="text"
                                v-model="editedBlockDataForm.responsiblePerson" required>
                            <input v-if="props.role == 'carrier'" type="text"
                                v-model="editedBlockDataForm.carrier.transporter" required>
                        </td>
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
import { ref, defineEmits } from 'vue'

const editedBlockDataForm = ref({
    producer: '',
    location: '',
    responsiblePerson: '',
    carrier: {
        origin: '无',
        destination: '无',
        transporter: '无'
    }
});

const props = defineProps(['showModal', 'addBlock', 'updateBlock', 'editBlock', 'editedBlockIndex', 'role', 'filteredChain']);

const emit = defineEmits(['closeModal', 'addBlock', 'updateBlock'])

const submitForm = (event) => {
    event.preventDefault();
};

const closeModal = () => {
    //传递给父组件
    emit('closeModal')
};

const finishForm = () => {
    const block = ref({});
    if (props.role == 'producer') {
        const { producer, location, responsiblePerson } = editedBlockDataForm.value;
        if (producer && location && responsiblePerson) {
            block.value = {
                producer,
                location,
                responsiblePerson,
                carrier: {
                    origin: '无',
                    destination: '无',
                    transporter: '无'
                }
            };
        }
    }
    else if (props.role == 'carrier') {
        const { origin, destination, transporter } = editedBlockDataForm.value.carrier;
        if (origin && destination && transporter) {
            block.value = {
                producer: props.filteredChain[props.editedBlockIndex - 1].data.producer,
                location: props.filteredChain[props.editedBlockIndex - 1].data.location,
                responsiblePerson: props.filteredChain[props.editedBlockIndex - 1].data.responsiblePerson,
                carrier: {
                    origin: origin,
                    destination: destination,
                    transporter: transporter
                }
            };
        }
    }
    //传递给父组件
    if (props.editedBlockIndex)
        emit('updateBlock', block.value)
    else
        emit('addBlock', block.value)
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