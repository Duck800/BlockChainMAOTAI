<template>
    <div class="blockchain-app">
        <h1>茅台酒区块链</h1>
        <div class="input-container">
            <input type="text" v-model="searchQuery" placeholder="搜索区块信息">
        </div>
        <button @click="showModal = true" class="add-button">添加数据</button>

        <Modal :role="role" :showModal="showModal" :editedBlockDataForm="editedBlockDataForm"
            :newBlockDataForm="newBlockDataForm" :editedBlockIndex="editedBlockIndex" :filteredChain="filteredChain"
            @closeModal="handleCloseModal" @addBlock="addBlock" @updateBlock="updateBlock" />

        <BlockchainTable :role="role" :filteredChain="filteredChain" @editBlock="handleEditBlock" />

        <div v-if="blockchain.isChainValid()" class="blockchain-status valid">
            区块链有效
        </div>
        <div v-else class="blockchain-status invalid">
            区块链无效
        </div>
    </div>
</template>

<script setup>
import { Blockchain, Block } from '@/BlockChain.js';
import { ref, computed, watchEffect } from 'vue';
import Modal from '@/components/Modal.vue';
import BlockchainTable from '@/components/BlockchianTable.vue';

let role = "producer"

const blockchain = new Blockchain();
const chain = ref(blockchain.chain);

const showModal = ref(false);
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
const editedBlockIndex = ref(); // 用于保存正在编辑的区块的索引

const newBlockDataForm = ref({
    producer: '',
    location: '',
    responsiblePerson: '',
    carrier: {
        origin: '无',
        destination: '无',
        transporter: '无'
    }
});

// Load chain data from local storage when the page starts
if (localStorage.getItem('blockchain')) {
    blockchain.chain = JSON.parse(localStorage.getItem('blockchain'));
    chain.value = [...blockchain.chain];
}

function handleCloseModal() {
    showModal.value = false;
    editedBlockDataForm.value = {
        producer: '',
        location: '',
        responsiblePerson: ''
    };
    newBlockDataForm.value = {
        producer: '',
        location: '',
        responsiblePerson: '',
        carrier: {
            origin: '无',
            destination: '无',
            transporter: '无'
        }
    };
    editedBlockIndex.value = null;
}

function handleEditBlock(index) {
    showModal.value = true;
    editedBlockIndex.value = index;
}

function addBlock(block) {
    const latestBlock = blockchain.getLatestBlock();
    const newBlockIndex = latestBlock.index + 1;
    const newBlockTimestamp = new Date().toLocaleString();

    const newBlock = new Block(
        newBlockIndex,
        newBlockTimestamp,
        {
            productId: blockchain.calculateHash(
                newBlockIndex,
                newBlockTimestamp,
                block,
                latestBlock.hash
            ),
            ...block
        },
        latestBlock.hash
    );
    blockchain.addBlock(newBlock);
    console.log(newBlock)

    // 更新chain的引用
    chain.value = [...blockchain.chain];
    // Store the blockchain data in local storage
    localStorage.setItem('blockchain', JSON.stringify(blockchain.chain));
    showModal.value = false;
}

function updateBlock(block) {
    const updatedBlockData = block;

    blockchain.updateBlockData(editedBlockIndex.value, updatedBlockData);

    // 更新chain的引用
    chain.value = [...blockchain.chain];
    // Store the blockchain data in local storage
    localStorage.setItem('blockchain', JSON.stringify(blockchain.chain));
    showModal.value = false;
}

const searchQuery = ref('');

const filteredChain = computed(() => {
    if (!searchQuery.value) {
        return chain.value.filter((block) => block.index !== 0);
    }
    const query = searchQuery.value.toLowerCase();
    return chain.value.filter((block) => block.hash.toLowerCase().includes(query) && block.index !== 0);
});

const DataForm = computed(() => {
    return editedBlockIndex.value ? editedBlockDataForm.value : newBlockDataForm.value
});

console.log(blockchain.chain)
</script>

<style scoped>
.blockchain-app {
    width: 100%;
    height: 100%;
    background-image: url('../bgd.png');
    /* 背景图片位置 */
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    /* 背景图片是否重复 */
    background-size: 100% 100%;
    position: absolute;
    z-index: 1;
    /* 比根元素更高 */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

h1 {
    text-align: center;
}

.logo {
    display: block;
    margin: 0 auto;
    max-width: 200px;
    height: auto;
}

.add-button {
    position: absolute;
    top: 16.8%;
    right: 2%;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #ffffff;
    color: black;
    border-radius: 5px;
    cursor: pointer;
}

.blockchain-status {
    position: absolute;
    top: 24.8%;
    left: 1.5%;
    padding: 10px;
    text-align: center;
    font-weight: bold;
    border-radius: 4px;
}

.valid {
    color: green;
    background-color: #d4edda;
}

.invalid {
    color: red;
    background-color: #f8d7da;
}

.input-container {
    position: absolute;
    top: 16.2%;
    left: 2%;
    width: 50%;
}

.input-container input[type="text"] {
    padding: 15px;
    font-size: 16px;
    border-radius: 15px;
    border: 1px solid #ccc;
    width: 100%;
    background-color: white;
    color: black;
}
</style>