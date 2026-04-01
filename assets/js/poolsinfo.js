/**
 * Pool statistics
 **/
function getPoolMiningCore(poolID, poolURL){
   var apiURL = poolURL +  "/"  + poolID; 
   $.get(apiURL, function(data){
        if (!data) return ;

        var poolHashrate = 'N/A';
        var poolMiners   = 'N/A';
        var blocksFound   = 'N/A';
        var networkHashrate = 'N/A';
        var networkDiff = 'N/A';
        var networkBlockheight = 'N/A';
        var hasheffort = 'N/A';
        var hashPower = 'N/A';
        var poolBlockReward = 'N/A';
        var algorithm = "N/A"; 
        var poolId = poolID;
        
        
        if (data.pool) {
            poolHashrate = getReadableHashRate(data.pool.poolStats.poolHashrate);
            poolMiners   = data.pool.poolStats.connectedMiners;
            blocksFound  = data.pool.totalBlocks;
            networkHashrate  = getReadableHashRate(data.pool.networkStats.networkHashrate);
            networkDiff = getReadableDiff(data.pool.networkStats.networkDifficulty);
            networkBlockheight = data.pool.networkStats.blockHeight;
            hasheffort = data.pool.poolEffort.toFixed(1) + " %";
            hashPower = (data.pool.poolStats.poolHashrate / data.pool.networkStats.networkHashrate) * 100;
            hashPower = hashPower.toFixed(2) + '%';
             if (poolId === 'btc') {
                poolBlockReward = 3.125
             } else if (poolId === 'bch'){
                poolBlockReward = 3.125
             } else if (poolId === 'ltc'){
                poolBlockReward = 6.250
             } else if (poolId === 'doge'){
                poolBlockReward = 10000
             } else {
                poolBlockReward = 0
             }; 
            algorithm = data.pool.coin.algorithm
        }

        updateText(poolID + '_poolHashrate', poolHashrate);
        updateText(poolID + '_poolMiners', poolMiners);
	      updateText(poolID + '_blocksFound', blocksFound);
        updateText(poolID + '_networkHashrate', networkHashrate);
        updateText(poolID + '_networkDiff', networkDiff);
        updateText(poolID + '_networkBlockheight', networkBlockheight);
        updateText(poolID + '_hasheffort', hasheffort);
        updateText(poolID + '_hashPower', hashPower)
        updateText(poolID + '_poolBlockReward', poolBlockReward);
        updateText(poolID + '_algorithm', algorithm);
        updateText(poolID + '_poolBlockReward_replicate', poolBlockReward);
        updateText(poolID + '_algorithm_replicate', algorithm);
    });
}

function getPoolStats(poolID, poolURL) {
    var apiURL = poolURL + '/stats';
    $.get(apiURL, function(data){
        if (!data) return ;

        var poolHashrate = 'N/A';
        var poolMiners   = 'N/A';
        var poolMinersSolo   = 'N/A';
        var poolWorkers  = 'N/A';
        var poolWorkersSolo = 'N/A';
        if (data.pool) {
            poolHashrate = getReadableHashRate(data.pool.hashrate);
            poolMiners   = data.pool.miners || 0;
            poolMinersSolo   = data.pool.miners || 0;
            poolWorkers  = data.pool.workers || 0;
            poolWorkersSolo  = data.pool.workersSolo || 0;
        }

        var poolBlockReward = 'N/A';
        if (data.lastblock) {
            poolBlockReward = (data.lastblock.reward / data.config.denominationUnit).toFixed(3)|| 0;

        }

        var networkHashrate = 'N/A';
        var networkDiff     = 'N/A';
        if (data.network) {
            networkHashrate = getReadableHashRate(data.network.difficulty / data.config.coinDifficultyTarget);
            networkDiff     = data.network.difficulty;
        }

        var hashPower = 'N/A';
        var poolDifficulty = 'N/A';
        var poolBlockheight = 'N/A';
        var hasheffort = 'N/A';

        if (data.pool && data.network) {
            hashPower = data.pool.hashrate / (data.network.difficulty / data.config.coinDifficultyTarget) * 100;
            hashPower = hashPower.toFixed(2) + '%';
            poolDifficulty = getReadableDiff(data.network.difficulty);
            poolBlockheight = data.network.height;
            hasheffort = (data.pool.roundHashes / data.network.difficulty * 100).toFixed(1) + ' %';
        }

        var blocksFound = data.pool.totalBlocks.toString();

        var cnAlgorithm = data.config.cnAlgorithm || "cryptonight";
        var cnVariant = data.config.cnVariant || 0;

        if (cnAlgorithm == "cryptonight_light") {
            if (cnVariant === 1) {
                algorithm = 'CN Light v7';
            } else if (cnVariant === 2) {
                algorithm = 'CN Light v7';
            } else {
                algorithm = 'CN Light';
            }
        }
	    else if (cnAlgorithm == "cryptonight_pico") {
            algorithm = 'CN Turtle';
        }
        else if (cnAlgorithm == "meme") {
            algorithm = 'Memehash';
        }
        else if (cnAlgorithm == "cryptonight_heavy") {
            algorithm = 'CN Heavy';
        }
        else if (cnAlgorithm == "cryptonight_plex") {
            algorithm = 'CN UPX V2';
        }
        else if (cnAlgorithm == "argon2") {
            algorithm = 'Chukwa';
        }
        else if (cnAlgorithm == "randomx") {
            if (cnVariant === 2) {
                algorithm = 'Random/ARQ';
            } else if (cnVariant === 6) {
                algorithm = 'Random/Nevo';
            } else {
                algorithm = 'RandomX';
            }
        }
        else if (cnAlgorithm == "ethash") {
            if (cnVariant === 2) {
                algorithm = 'ProgPowZ';
            } 
        }
        else {
            if (cnVariant === 1) {
                algorithm = 'CN v7';
            } else if (cnVariant === 3) {
                algorithm = 'CN v7';
            } else if (cnVariant === 11) {
                algorithm = 'CN Conceal';
            } else {
                algorithm = 'Cryptonight';
            }
        }

        updateText(poolID + '_poolHashrate', poolHashrate);
        updateText(poolID + '_poolMiners', poolMiners);
        updateText(poolID + '_poolMinersSolo', poolMinersSolo);
	      updateText(poolID + '_poolWorkers', poolWorkers);
        updateText(poolID + '_poolWorkersSolo', poolWorkersSolo);
        updateText(poolID + '_networkHashrate', networkHashrate);
        updateText(poolID + '_hashPower', hashPower);
        updateText(poolID + '_poolDifficulty', poolDifficulty);
        updateText(poolID + '_poolBlockheight', poolBlockheight);
        updateText(poolID + '_hasheffort', hasheffort);
        updateText(poolID + '_blocksFound', blocksFound);
        updateText(poolID + '_poolBlockReward', poolBlockReward);
        updateText(poolID + '_poolBlockReward_replicate', poolBlockReward);
        updateText(poolID + '_algorithm', algorithm);
        updateText(poolID + '_algorithm_replicate', algorithm);
    });
}

// Update
    getPoolMiningCore('btc', 'https://api.globalcryptomining.infinium.space/api/pools');
    getPoolMiningCore('bch', 'https://api.globalcryptomining.infinium.space/api/pools');
    getPoolMiningCore('ltc', 'https://api.globalcryptomining.infinium.space/api/pools');
    getPoolMiningCore('plsr', 'https://api.globalcryptomining.infinium.space/api/pools');

}

// Initialize
$(function() {
    setInterval(updatePools, (30*1000));
    updatePools();
});

/**
 * Strings
 **/

// Update Text content
function updateText(elementId, text){
    var el = document.getElementById(elementId);
    if (el && el.textContent !== text){
        el.textContent = text;
    }
    return el;
}

// Get readable hashrate
function getReadableHashRate(hashrate){
    var i = 0;
    var byteUnits = [' H',' KH',' MH',' GH',' TH',' PH',' EH',' ZH',' YH',' RH',' QH',' WH',' VH',' UH',' SH',' NH',' DH',' HH'];
    while (hashrate > 1000){
        hashrate = hashrate / 1000;
        i++;
    }
    return hashrate.toFixed(2) + byteUnits[i] + '/s';
}

function getReadableDiff(Diff){
    var i = 0;
    var byteUnits = [' ',' K',' M',' G',' T',' P',' E',' Z',' Y',' R',' Q',' W',' V',' U',' S',' N',' D',' H'];
    while (Diff > 1000){
        Diff = Diff / 1000;
        i++;
    }
    return Diff.toFixed(2) + byteUnits[i];
}
