        const ICONS = {
            BTC: '<path d="M17.05,10.28C16.5,8.11 14.75,6.4 12.31,5.88V3.38H9.81V5.88H8.31V3.38H5.81V5.92H2.31V8.42H3.81C4.64,8.42 5.31,9.09 5.31,9.92V17.56C5.31,18.39 4.64,19.06 3.81,19.06H2.31V21.56H5.81V21.56H5.81V24.06H8.31V21.53H9.81V24.03H12.31V21.14C15.39,20.73 17.62,18.68 17.19,15.86C16.96,14.37 16.09,13.26 14.93,12.69C15.96,12.15 16.78,11.03 17.05,10.28M13.03,17.53H10.34V14.03H13.03C14,14.03 14.78,14.81 14.78,15.78C14.78,16.75 14,17.53 13.03,17.53M12.55,12.03H10.34V9.03H12.55C13.38,9.03 14.05,9.7 14.05,10.53C14.05,11.36 13.38,12.03 12.55,12.03Z"/>',
            ETH: '<path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>',
            SOL: '<path d="M19.437 8.71c.03 0 .059-.006.086-.017l.051-.023a.603.603 0 0 0 .233-.184l.032-.046c.179-.316.105-.725-.208-.934L5.266 1.13a.81.81 0 0 0-.353-.13H3.954c-.03 0-.059.006-.087.017l-.05.023a.608.608 0 0 0-.234.184l-.032.046c-.178.316-.105.725.209.934l14.365 6.377a.815.815 0 0 0 .353.13h.96zm.61 6.58c.03 0 .058-.006.086-.017l.05-.023a.604.604 0 0 0 .234-.184l.032-.046c.179-.316.105-.725-.208-.934L5.875 7.71a.81.81 0 0 0-.352-.13H4.563c-.03 0-.059.006-.087.017l-.05.023a.61.61 0 0 0-.23.184l-.03.046c-.18.316-.1.725.21.934l14.36 6.376a.81.81 0 0 0 .35.13h.96z"/>',
            ADA: '<path d="M12 13.55c.85 0 1.54-.7 1.54-1.55a1.545 1.545 0 1 0-1.54 1.55zm4.25-1.55c0 .86.69 1.55 1.55 1.55.85 0 1.55-.69 1.55-1.55 0-.85-.7-1.55-1.55-1.55-.86 0-1.55.7-1.55 1.55zm7.75 12c0 .86.69 1.55 1.55 1.55.85 0 1.55-.69 1.55-1.55 0-.85-.7-1.55-1.55-1.55-.86 0-1.55.7-1.55 1.55zm4.25 4.25c.85 0 1.54-.7 1.54-1.55a1.545 1.545 0 1 0-1.54 1.55zm0-8.5c.85 0 1.54-.7 1.54-1.55A1.545 1.545 0 1 0 12 7.75zm-4.25 4.25c.85 0 1.54-.7 1.54-1.55a1.545 1.545 0 1 0-1.54 1.55zm8.5 0c.85 0 1.54-.7 1.54-1.55a1.545 1.545 0 1 0-1.54 1.55zM12 2.25A1.545 1.545 0 1 0 12 5.35c.85 0 1.54-.7 1.54-1.55 0-.86-.69-1.55-1.54-1.55zm0 19.5a1.545 1.545 0 1 0 0 3.1 1.545 1.545 0 0 0 0-3.1zm9.75-9.75a1.545 1.545 0 1 0 0 3.1 1.545 1.545 0 0 0 0-3.1zM2.25 12a1.545 1.545 0 1 0 0 3.1 1.545 1.545 0 0 0 0-3.1z"/>',
            XRP: '<path d="M12.005 13.572l6.338 6.387 1.413-1.416-6.402-6.328 6.326-6.22-1.412-1.416-6.263 6.29-6.34-6.368-1.414 1.416 6.42 6.298-6.327 6.232 1.414 1.416z"/>'
        };

        const DEFAULT_COINS = {
            'bitcoin': { symbol: 'BTC', name: 'Bitcoin', color: '#f59e0b', image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png', path: ICONS.BTC },
            'ethereum': { symbol: 'ETH', name: 'Ethereum', color: '#6366f1', image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png', path: ICONS.ETH },
            'solana': { symbol: 'SOL', name: 'Solana', color: '#14b8a6', image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png', path: ICONS.SOL },
            'cardano': { symbol: 'ADA', name: 'Cardano', color: '#3b82f6', image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png', path: ICONS.ADA },
            'ripple': { symbol: 'XRP', name: 'Ripple', color: '#ffffff', image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png', path: ICONS.XRP }
        };

        const safeParse = (key, def) => { try { return JSON.parse(localStorage.getItem(key)) || def; } catch { return def; } };

        class CryptoApp {
            constructor() {
                window.onerror = (msg) => console.error("App Error: " + msg);

                const savedCustom = safeParse('crypto_custom_coins', {});
                this.coinMap = { ...savedCustom, ...DEFAULT_COINS }; 
                this.transactions = safeParse('crypto_txs', []);
                this.apiConfig = safeParse('crypto_api_config', { type: 'free', key: '' });
                this.displayCurrency = localStorage.getItem('crypto_currency') || 'BRL';
                // NOVO: Unidade de Exibição (BTC ou SATS)
                this.displayUnit = localStorage.getItem('crypto_unit') || 'BTC';
                this.privacyMode = localStorage.getItem('crypto_privacy') === 'true' || false;

                this.cacheDuration = 300000; // 5 Minutos
                this.prices = {};
                this.rateBrlToUsd = 0;
                this.nextUpdate = 0; 
                this.isAutoRefreshing = false; 

                this.requestQueue = [];
                this.isProcessingQueue = false;
                this.chartDays = safeParse('crypto_chart_days', 30); 
                
                this.queueDelay = 15000; 
                this.cooldownTime = 0; 
                
                this.historyCache = safeParse('crypto_history_cache', {}); 
                
                // CARREGA OS DADOS DO LOCALSTORAGE
                this.localData = safeParse('crypto_local_history', {});

                // NOVO: Array para transações que precisam de preço manual
                this.transactionsToReview = [];
                this._currentFilteredCoin = null;

                // Bindings
                this.log = this.log.bind(this);
                this.refreshAll = this.refreshAll.bind(this);
                this.toggleConsole = this.toggleConsole.bind(this);
                this.openSettings = this.openSettings.bind(this);
                this.closeSettings = this.closeSettings.bind(this);
                this.updateFormTheme = this.updateFormTheme.bind(this);
                this.saveSettings = this.saveSettings.bind(this);
                this.handleAddTransaction = this.handleAddTransaction.bind(this);
                this.setApiStatusUI = this.setApiStatusUI.bind(this);
                this.addToQueue = this.addToQueue.bind(this);
                this.processQueue = this.processQueue.bind(this);
                this.getIconHtml = this.getIconHtml.bind(this);
                this.formatMoney = this.formatMoney.bind(this);
                this.formatQuantity = this.formatQuantity.bind(this);
                this.updateCurrencyUI = this.updateCurrencyUI.bind(this);
                this.forceClearCache = this.forceClearCache.bind(this);
                this.renderHistory = this.renderHistory.bind(this);
                this.updateDonut = this.updateDonut.bind(this);
                this.updateLineChart = this.updateLineChart.bind(this);
                this.importData = this.importData.bind(this);
                this.updateTitle = this.updateTitle.bind(this);
                this.updateRangeUI = this.updateRangeUI.bind(this);
                this.fetchHistory = this.fetchHistory.bind(this);
                this.togglePrivacy = this.togglePrivacy.bind(this);
                this.smartFetchPrice = this.smartFetchPrice.bind(this);
                this.calculateBreakEven = this.calculateBreakEven.bind(this);
                this.importHistoryFile = this.importHistoryFile.bind(this);
                this.showDateRange = this.showDateRange.bind(this); 
                this.setUnit = this.setUnit.bind(this); // NOVO
                this.updateUnitUI = this.updateUnitUI.bind(this); // NOVO
                this.switchSettingsTab = this.switchSettingsTab.bind(this);

                // Funções de Edição e Exportação
                this.openEditModal = this.openEditModal.bind(this);
                this.closeEditModal = this.closeEditModal.bind(this);
                this.handleUpdateTransaction = this.handleUpdateTransaction.bind(this);
                this.exportToCsv = this.exportToCsv.bind(this);

                // NOVO: Funções para o modal de preço manual
                this.openManualPriceModal = this.openManualPriceModal.bind(this);
                this.cancelManualPriceEntry = this.cancelManualPriceEntry.bind(this);
                this.submitManualPrices = this.submitManualPrices.bind(this);
                this.getPriceForDate = this.getPriceForDate.bind(this);

                // NOVO: Funções do conversor
                this.openConverterModal = this.openConverterModal.bind(this);
                this.closeConverterModal = this.closeConverterModal.bind(this);
                this.resetConverter = this.resetConverter.bind(this);
                this.convertValues = this.convertValues.bind(this);
                this.fetchFearAndGreed = this.fetchFearAndGreed.bind(this);

                this.initUI();
                this.loadPricesFromCache();
                this.refreshAll();
                
                this.tryLoadLocalFile();

                setInterval(() => this.updateCooldownVisual(), 1000);
            }

            // Tenta carregar apenas se tiver no servidor, silencioso se falhar
            async tryLoadLocalFile() {
                if(Object.keys(this.localData).length > 0) {
                    this.showDateRange(); // Mostra as datas se já tiver dados
                    this.log('Base de dados local (bitcoin.xlsx/csv) encontrada na memória cache.', 'info');
                    return;
                }
                try {
                    const res = await fetch('./bitcoin.xlsx');
                    if (!res.ok) {
                        // If .xlsx fails, try .csv as a fallback
                        const resCsv = await fetch('./bitcoin.csv');
                        if (!resCsv.ok) {
                             this.log('Base de dados local (bitcoin.xlsx ou .csv) não encontrada no diretório.', 'warn');
                            return; 
                        }
                        const text = await resCsv.text();
                        this.processCsvData(text); // This one has its own logging, no alerts
                        this.log('Base de dados local (bitcoin.csv) carregada com sucesso.', 'success');
                        return;
                    };
                    const data = await res.arrayBuffer();
                    const workbook = XLSX.read(new Uint8Array(data), {type: 'array'});
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});
                    this.processData(jsonData, true); // Pass true for silent
                    this.log('Base de dados local (bitcoin.xlsx) carregada com sucesso.', 'success');
                } catch (e) {
                    this.log('Falha ao tentar carregar base de dados local: ' + e.message, 'error');
                }
            }

            // NOVO: Mostra intervalo de datas (primeira e última)
            showDateRange() {
                const dates = Object.keys(this.localData).sort();
                const elRange = document.getElementById('csvDateRange');
                const elStatus = document.getElementById('csvStatus');
                
                if (dates.length > 0 && elRange) {
                    const first = dates[0].split('-').reverse().join('/');
                    const last = dates[dates.length - 1].split('-').reverse().join('/');
                    
                    elRange.innerHTML = `<div class="date-range-badge">📅 ${first} até ${last}</div>`;
                    elRange.classList.remove('hidden');
                    
                    if(elStatus) {
                        elStatus.innerText = `${dates.length} datas carregadas na memória.`;
                        elStatus.classList.add('text-green-500');
                    }
                    this.log(`Intervalo BTC: ${first} - ${last}`, 'info');
                }
            }

            // NOVO: Processa o Arquivo (XLSX ou CSV) enviado pelo usuário
            importHistoryFile(input) {
                const f = input.files[0];
                if(!f) return;
                
                const r = new FileReader();
                
                // Usamos ArrayBuffer para suportar XLSX e CSV via SheetJS
                r.onload = (e) => {
                    try {
                        const data = new Uint8Array(e.target.result);
                        const workbook = XLSX.read(data, {type: 'array'});
                        const firstSheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[firstSheetName];
                        
                        // Converte para JSON (Array de Arrays) - Mais robusto que texto
                        const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});
                        
                        this.processData(jsonData);
                        alert('Base de dados carregada com sucesso!');
                    } catch(err) {
                        console.error(err);
                        alert('Erro ao ler arquivo. Verifique se é um .xlsx ou .csv válido.');
                    }
                };
                r.readAsArrayBuffer(f);
                
                input.value = '';
            }

            processData(rows, silent = false) {
                let count = 0;
                
                // Ignora cabeçalho (linha 0)
                const dataRows = rows.slice(1);
                
                dataRows.forEach(cols => {
                    if (!cols || cols.length < 2) return;
                    
                    // Tenta pegar timestamp da coluna 0
                    // Tenta pegar preço da coluna 7 (ou ultima se não tiver 8)
                    try {
                        // Verifica se é um número ou string numérica
                        const ts = typeof cols[0] === 'number' ? cols[0] : parseInt(cols[0]);
                        
                        // Procura preço na coluna 7 (índice 7 = 8ª coluna), ou na última disponível
                        let priceVal = cols[7];
                        if (priceVal === undefined) priceVal = cols[cols.length-1];
                        
                        // Trata vírgula decimal se for string (ex: "92094,53")
                        if (typeof priceVal === 'string') {
                            priceVal = priceVal.replace(',', '.');
                        }
                        const price = parseFloat(priceVal);

                        if (!isNaN(ts) && !isNaN(price)) {
                            // IMPORTANTE: Usa UTC para garantir consistência com o input date HTML
                            const date = new Date(ts); // Assume que ts é um timestamp Unix
                            // Garante YYYY-MM-DD
                            const dateStr = date.toISOString().split('T')[0]; 
                            this.localData[dateStr] = price;
                            count++;
                        }
                    } catch(e) {}
                });

                if(count > 0) {
                    localStorage.setItem('crypto_local_history', JSON.stringify(this.localData));
                    this.showDateRange(); // Atualiza a UI com as datas
                    this.log(`Importado: ${count} datas de BTC.`, 'success');
                    if (!silent) alert('Base de dados carregada com sucesso!');
                } else {
                    if (!silent) alert('Nenhum dado válido encontrado. Verifique as colunas (Timestamp na 1ª, PriceClose na 8ª).');
                }
            }
            
            // Tenta processar CSV puro se falhar o xlsx (fallback para o botão de CSV específico)
            processCsvData(text) {
                const lines = text.split('\n').slice(1); // Remove header
                let count = 0;
                
                lines.forEach(line => {
                    const cols = line.trim().split(/[	,;]+/); // Split by tab, comma, or semicolon
                    
                    if (cols.length < 2) return;
                    try {
                        const ts = parseInt(cols[0]);
                        // Tenta pegar a penúltima coluna ou a 8a (índice 7)
                        let priceVal = cols[7] || cols[cols.length - 2]; 
                        
                        if (typeof priceVal === 'string') priceVal = priceVal.replace(',', '.');
                        const price = parseFloat(priceVal);

                        if (!isNaN(ts) && !isNaN(price)) {
                            const date = new Date(ts); // Assume que ts é um timestamp Unix
                            const dateStr = date.toISOString().split('T')[0]; 
                            this.localData[dateStr] = price;
                            count++;
                        }
                    } catch(e) {}
                });

                if(count > 0) {
                    localStorage.setItem('crypto_local_history', JSON.stringify(this.localData));
                    this.showDateRange();
                    this.log(`Importado CSV: ${count} datas.`, 'success');
                }
            }

            // --- UI HELPERS ---
            getIconHtml(config) {
                if (config && config.path) {
                    const bg = config.symbol === 'XRP' ? '#333' : config.color;
                    return `<div class="coin-icon-wrapper" style="background-color: ${bg}"><img src="${config.image}" class="coin-img-primary" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><div class="coin-svg-fallback" style="display: none;"><svg viewBox="0 0 24 24" fill="#ffffff">${config.path}</svg></div></div>`;
                }
                return `<img src="${config.image}" class="w-full h-full rounded-full">`;
            }

            formatMoney(value, symbol) {
                if (this.privacyMode) return '••••••';
                return `${symbol} ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }
            
            formatQuantity(value, symbol) {
                if (this.privacyMode) return '••••••';
                
                // NOVA LÓGICA: Se for Bitcoin e o modo for SATS, converte
                if (symbol === 'BTC' && this.displayUnit === 'SATS') {
                    const sats = value * 100000000;
                    return `${sats.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} Sats`;
                }
                
                return `${value.toFixed(6)} ${symbol}`;
            }

            toggleConsole() { const el = document.getElementById('consoleModal'); if(el) el.classList.toggle('hidden'); }
            openSettings() { const el = document.getElementById('settingsModal'); if(el) el.classList.remove('hidden'); }
            closeSettings() { const el = document.getElementById('settingsModal'); if(el) el.classList.add('hidden'); }

            switchSettingsTab(tabName, clickedButton) {
                // Hide all tab contents
                document.querySelectorAll('.settings-tab-content').forEach(el => el.classList.add('hidden'));
                
                // Deactivate all tab buttons
                document.querySelectorAll('.settings-tab-btn').forEach(el => {
                    el.classList.remove('text-blue-400', 'border-blue-400');
                    el.classList.add('text-gray-400', 'border-transparent');
                });
                
                // Show the selected tab content
                document.getElementById('tab-content-' + tabName).classList.remove('hidden');
                
                // Activate the clicked button
                clickedButton.classList.add('text-blue-400', 'border-blue-400');
                clickedButton.classList.remove('text-gray-400', 'border-transparent');
            }

            closeImportWarningModal() { const el = document.getElementById('importWarningModal'); if(el) el.classList.add('hidden'); }
            
            log(msg, type='info') { 
                const b = document.getElementById('consoleBody'); 
                if(!b) return;
                const d = document.createElement('div'); 
                d.className = `log-entry log-${type}`; 
                d.innerText = `> ${msg}`; 
                b.appendChild(d); 
                b.scrollTop = b.scrollHeight; 
            }

            updateCooldownVisual() {
                const diff = Math.max(0, Math.ceil((this.cooldownTime - Date.now()) / 1000));
                const elStatus = document.getElementById('apiStatus');
                if(!elStatus) return;
                const txt = elStatus.querySelector('span:last-child');
                
                if(this.isProcessingQueue && diff > 0 && txt) {
                    txt.innerText = `⏳ ${diff}s`;
                    txt.className = 'text-blue-300 font-mono animate-pulse';
                }
            }

            setApiStatusUI(text, type) {
                const el = document.getElementById('apiStatus');
                if(!el) return;
                const dot = el.querySelector('.live-indicator');
                const txt = el.querySelector('span:last-child');
                
                if(dot) dot.className = `live-indicator mr-1 ${type === 'live' ? '' : type}`;
                if(txt) {
                    txt.innerText = text;
                    txt.className = 'font-mono ' + (type === 'live' ? 'text-green-400' : type === 'cache' ? 'text-yellow-500' : type === 'busy' ? 'text-blue-400 animate-pulse' : 'text-red-400');
                }
            }

            updateProgressBar(pct) {
                const bar = document.getElementById('topProgressBar');
                if(bar) {
                    bar.style.width = `${pct}%`;
                    if(pct >= 100 || pct === 0) setTimeout(() => { if(bar) bar.style.width = '0%'; }, 500);
                }
            }

            getApiUrl(ep) {
                let u = `https://api.coingecko.com/api/v3${ep}`;
                if(this.apiConfig.type === 'key' && this.apiConfig.key) u += `${u.includes('?')?'&':'?'}x_cg_demo_api_key=${this.apiConfig.key}`;
                return u;
            }

            updateTitle() {
                if(this.privacyMode) { document.title = "Crypto Control V2"; return; }
                if(this.prices && this.prices.bitcoin) {
                    const btc = this.displayCurrency === 'BRL' ? this.prices.bitcoin.brl : this.prices.bitcoin.usd;
                    const sym = this.displayCurrency === 'BRL' ? 'R$' : '$';
                    document.title = `BTC ${sym} ${(btc/1000).toFixed(1)}k`;
                }
            }

            updateRangeUI() {
                document.querySelectorAll('.range-btn').forEach(b => b.classList.remove('active'));
                const btn = document.getElementById(`range${this.chartDays}`);
                if(btn) btn.classList.add('active');
            }

            // --- INIT ---
            initUI() {
                const dateInput = document.getElementById('dateInput');
                if(dateInput) dateInput.valueAsDate = new Date();
                
                this.populateCoinSelect(document.getElementById('coinSelect'));
                this.populateCoinSelect(document.getElementById('editCoinSelect'));
                this.updateCurrencyUI();
                this.updateUnitUI(); // NOVO: Atualiza UI da Unidade
                this.updateFormTheme();
                this.setApiStatusUI('Pronto', 'live');
                this.updateRangeUI();
                
                // Atualiza ícone de privacidade
                const privIcon = document.getElementById('privacyIconMobile');
                if(privIcon) privIcon.className = this.privacyMode ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
                
                // Listeners
                const setForm = document.getElementById('settingsForm');
                if(setForm) setForm.onsubmit = this.saveSettings;
                
                const txForm = document.getElementById('txForm');
                if(txForm) txForm.onsubmit = this.handleAddTransaction;
                
                const editTxForm = document.getElementById('editTxForm');
                if(editTxForm) editTxForm.onsubmit = this.handleUpdateTransaction;
                
                document.querySelectorAll('input[name="apiType"]').forEach(r => {
                    r.onchange = (e) => {
                        const f = document.getElementById('apiKeyField');
                        if(f) f.classList.toggle('hidden', e.target.value === 'free');
                    }
                });
            }

            populateCoinSelect(sel) {
                if(!sel) return;
                const currentValue = sel.value;
                sel.innerHTML = '';
                
                // Sort Bitcoin first
                const sortedIds = Object.keys(this.coinMap).sort((a, b) => {
                    if (a === 'bitcoin') return -1;
                    if (b === 'bitcoin') return 1;
                    return this.coinMap[a].name.localeCompare(this.coinMap[b].name);
                });

                sortedIds.forEach(id => {
                    const c = this.coinMap[id];
                    const opt = document.createElement('option');
                    opt.value = id;
                    opt.text = `${c.name} (${c.symbol})`;
                    sel.appendChild(opt);
                });

                if (currentValue && this.coinMap[currentValue]) {
                    sel.value = currentValue;
                } else if (this.coinMap['bitcoin']) {
                    sel.value = 'bitcoin';
                }
            }

            updateFormTheme() {
                const sel = document.getElementById('coinSelect');
                if(!sel) return;
                const c = this.coinMap[sel.value];
                if(!c) return;
                
                const iconDiv = document.getElementById('formIconContainer');
                if(iconDiv) iconDiv.innerHTML = this.getIconHtml(c);
                
                const btn = document.getElementById('submitBtn');
                if(btn) btn.style.backgroundColor = c.color || '#d97706';
                
                const form = document.getElementById('formContainer');
                if(form) form.style.borderColor = c.color || '#d97706';
            }

            // --- QUEUE SYSTEM ---
            addToQueue(taskFn) {
                this.requestQueue.push(taskFn);
                if (!this.isProcessingQueue) this.processQueue();
            }

            async processQueue() {
                if (this.requestQueue.length === 0) {
                    this.isProcessingQueue = false;
                    this.updateProgressBar(0);
                    this.setApiStatusUI('API OK', 'live');
                    return;
                }
                this.isProcessingQueue = true;
                const task = this.requestQueue.shift();
                this.cooldownTime = Date.now() + this.queueDelay;
                
                this.setApiStatusUI('Carregando...', 'busy');
                try { await task(); } catch(e) { this.log('Queue Error', 'error'); }

                await new Promise(r => setTimeout(r, this.queueDelay));
                this.processQueue();
            }

            // --- DATA ---
            loadPricesFromCache() {
                const cached = safeParse('crypto_prices_cache', null);
                if (cached && cached.data) {
                    this.prices = cached.data;
                    this.rateBrlToUsd = cached.rate || 0;
                    this.nextUpdate = cached.ts + this.cacheDuration;
                    if(Date.now() > this.nextUpdate) this.nextUpdate = Date.now();
                    
                    this.calculatePortfolio();
                    this.setApiStatusUI('Cache', 'cache');
                    this.log('Cache carregado.', 'info');
                    
                    // Tenta carregar gráfico imediatamente do cache
                    this.fetchHistory(); 
                }
            }

            async refreshAll(force = false) {
                if(this.isAutoRefreshing) return;
                
                const now = Date.now();
                const ids = Object.keys(this.coinMap).join(',');
                
                if (!force && this.nextUpdate > now && Object.keys(this.prices).length > 0) {
                    this.log('Cache válido.', 'info');
                    this.fetchHistory(); // Garante que grafico carregue mesmo se preco estiver em cache
                    return;
                }

                this.isAutoRefreshing = true;
                this.setApiStatusUI('Buscando...', 'busy');
                this.log('Atualizando preços...', 'info');
                this.nextUpdate = Date.now() + 60000;

                try {
                    const url = this.getApiUrl(`/simple/price?ids=${ids}&vs_currencies=brl,usd&include_24hr_change=true`);
                    const res = await fetch(url);
                    if(!res.ok) throw new Error(res.status);
                    
                    this.prices = await res.json();
                    if(this.prices.bitcoin) {
                        this.rateBrlToUsd = this.prices.bitcoin.usd / this.prices.bitcoin.brl;
                    }

                    localStorage.setItem('crypto_prices_cache', JSON.stringify({
                        ts: Date.now(), data: this.prices, rate: this.rateBrlToUsd
                    }));
                    
                    this.nextUpdate = Date.now() + this.cacheDuration;
                    this.calculatePortfolio();
                    this.setApiStatusUI('API OK', 'live');
                    this.log('Preços OK.', 'success');

                    this.fetchFearAndGreed();
                    this.fetchHistory(force); 
                } catch(e) {
                    this.setApiStatusUI('Erro API', 'error');
                    this.log('Erro API: ' + e.message, 'error');
                } finally {
                    this.isAutoRefreshing = false;
                }
            }

            fetchHistory(force = false) {
                const active = [...new Set(this.transactions.map(t => t.coinId))];
                if(active.length === 0) {
                    if(this.coinMap.bitcoin) active.push('bitcoin');
                    else return;
                }
                if(!active.includes('bitcoin') && this.coinMap.bitcoin) active.unshift('bitcoin');
                else if(active.includes('bitcoin')) {
                     const idx = active.indexOf('bitcoin');
                     if(idx > 0) { active.splice(idx, 1); active.unshift('bitcoin'); }
                }

                const targets = [...new Set(active)].slice(0, 5); 
                const vs = 'usd';
                const now = Date.now();
                const fetchDays = 365; // Sempre baixa 1 ano

                this.requestQueue = []; 

                targets.forEach((id, idx) => {
                    const key = `${id}_usd_${fetchDays}`;
                    
                    if(!force && this.historyCache[key] && (now - this.historyCache[key].ts < 43200000)) {
                        if(id === 'bitcoin') this.calculateMayer(this.historyCache[key].data);
                        this.updateLineChart(targets); // Desenha se tiver cache
                        return;
                    }

                    this.addToQueue(async () => {
                        this.updateProgressBar(Math.round(((idx + 1) / targets.length) * 100));
                        this.log(`Baixando: ${id}`, 'info');
                        
                        const res = await fetch(this.getApiUrl(`/coins/${id}/market_chart?vs_currency=${vs}&days=${fetchDays}&interval=daily`));
                        if(res.status === 429) throw new Error('Rate Limit');
                        const json = await res.json();
                        
                        if(json.prices) {
                            this.historyCache[key] = { ts: Date.now(), data: json.prices };
                            localStorage.setItem('crypto_history_cache', JSON.stringify(this.historyCache));
                            if(id === 'bitcoin') this.calculateMayer(json.prices);
                        }
                        this.updateLineChart(targets);
                    });
                });
            }

            calculatePortfolio() {
                const portfolio = {}; let totalBal=0, totalInv=0;
                const sym = this.displayCurrency === 'BRL' ? 'R$' : '$';
                const isBRL = this.displayCurrency === 'BRL';

                this.transactions.sort((a,b) => new Date(a.date) - new Date(b.date));
                this.transactions.forEach(tx => {
                    if(!portfolio[tx.coinId]) portfolio[tx.coinId] = { qty:0, invest:0, beInvest: 0 }; // Added beInvest
                    
                    let cost = tx.totalCost;
                    const txIsBRL = (!tx.currency || tx.currency === 'BRL');
                    
                    if(txIsBRL !== isBRL && this.rateBrlToUsd > 0) {
                        cost = txIsBRL ? cost * this.rateBrlToUsd : cost / this.rateBrlToUsd;
                    }
                    
                    // Lógica para agregação do Break Even
                    // Se existe BE salvo, usamos. Se não, usamos o preço médio de compra como fallback.
                    // Importante converter o BE salvo (que está na moeda original da transação) para a moeda atual de exibição
                    let txBePrice = tx.breakEven || (tx.amount > 0 ? tx.totalCost/tx.amount : 0);
                    
                    if (tx.breakEven && txIsBRL !== isBRL && this.rateBrlToUsd > 0) {
                         txBePrice = txIsBRL ? txBePrice * this.rateBrlToUsd : txBePrice / this.rateBrlToUsd;
                    }
                    
                    if(tx.type === 'buy') { 
                        portfolio[tx.coinId].qty += tx.amount; 
                        portfolio[tx.coinId].invest += cost; 
                        // O "investimento" para fins de BE é (Preço de Saída Necessário * Quantidade)
                        portfolio[tx.coinId].beInvest += (txBePrice * tx.amount);
                    }
                    else { 
                        const avg = portfolio[tx.coinId].qty > 0 ? portfolio[tx.coinId].invest/portfolio[tx.coinId].qty : 0; 
                        const avgBe = portfolio[tx.coinId].qty > 0 ? portfolio[tx.coinId].beInvest/portfolio[tx.coinId].qty : 0;
                        
                        portfolio[tx.coinId].invest -= avg * tx.amount; 
                        // Removemos proporcionalmente do bolo do BE também
                        portfolio[tx.coinId].beInvest -= avgBe * tx.amount;
                        portfolio[tx.coinId].qty -= tx.amount; 
                    }
                });

                const container = document.getElementById('assetsContainer');
                if(container) {
                    container.innerHTML = '';
                    const labels=[], data=[], colors=[];
                    
                    Object.keys(portfolio).forEach(id => {
                        const item = portfolio[id];
                        if(item.qty <= 0.000001) return;
                        const config = this.coinMap[id];
                        if(!config) return;

                        const curKey = isBRL ? 'brl' : 'usd';
                        const price = this.prices[id] ? this.prices[id][curKey] : 0;
                        const balance = item.qty * price;
                        const profit = balance - item.invest;
                        const pct = item.invest > 0 ? (profit/item.invest)*100 : 0;

                        totalBal += balance; totalInv += item.invest;
                        labels.push(config.name); data.push(balance); colors.push(config.color);

                        const icon = this.getIconHtml(config);
                        const sBal = this.formatMoney(balance, sym);
                        const sPrice = this.formatMoney(price, sym);
                        const sPM = this.formatMoney(item.invest/item.qty, sym);
                        // Calcula o BE Médio Ponderado
                        const avgBeVal = item.qty > 0 ? item.beInvest / item.qty : 0;
                        const sBE = this.formatMoney(avgBeVal, sym);
                        
                        const sQty = this.formatQuantity(item.qty, config.symbol);

                        container.innerHTML += `
                        <div class="glass-panel rounded-xl p-4 border border-gray-700 relative overflow-hidden transition">
                            <div class="flex justify-between items-center mb-2 relative z-10">
                                <div class="flex items-center">
                                    <div class="mr-3">${icon}</div>
                                    <div><div class="font-bold text-white text-sm">${config.name}</div><div class="text-xs text-gray-400 font-mono">${sQty}</div></div>
                                </div>
                                <div class="text-right"><div class="font-bold text-white text-sm">${sBal}</div><div class="text-[10px] text-gray-500">${sPrice}</div></div>
                            </div>
                            <div class="flex justify-between pt-2 border-t border-gray-700/50 text-xs relative z-10">
                                <div class="flex gap-3">
                                    <span class="text-gray-400" title="Preço Médio de Compra">PM: ${sPM}</span>
                                    <span class="text-purple-400 font-bold" title="Preço Médio de Saída (Break-even)">BE: ${sBE}</span>
                                </div>
                                <span class="${profit>=0?'text-green-400':'text-red-400'} font-bold">${profit>=0?'+':''}${pct.toFixed(2)}%</span>
                            </div>
                            <div class="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 filter blur-2xl" style="background-color:${config.color}"></div>
                        </div>`;
                    });
                    this.updateDonut(labels, data, colors);
                }

                const totProfit = totalBal - totalInv;
                const totPct = totalInv > 0 ? (totProfit/totalInv)*100 : 0;
                
                const elBal = document.getElementById('totalBalance');
                if(elBal) elBal.innerText = this.formatMoney(totalBal, sym);

                // NOVO: Exibe o patrimônio total em BTC/SATS
                const elBalBTC = document.getElementById('totalBalanceBTC');
                if (elBalBTC) {
                    // ALWAYS calculate total balance in USD for BTC conversion consistency
                    let totalBalUsdForBtc = 0;
                    Object.keys(portfolio).forEach(id => {
                        const item = portfolio[id];
                        if(item.qty <= 0.000001) return;

                        const priceUsd = this.prices[id] ? this.prices[id]['usd'] : 0;
                        totalBalUsdForBtc += item.qty * priceUsd;
                    });

                    const btcPriceUsd = this.prices.bitcoin ? this.prices.bitcoin.usd : 0;
                    if (btcPriceUsd > 0) {
                        const totalBalBTC = totalBalUsdForBtc / btcPriceUsd;
                        elBalBTC.innerText = this.formatQuantity(totalBalBTC, 'BTC');
                    } else {
                        elBalBTC.innerText = this.privacyMode ? '••••••' : '--- BTC';
                    }
                }
                const elInv = document.getElementById('totalInvested');
                if(elInv) elInv.innerText = this.formatMoney(totalInv, sym);
                const elPnL = document.getElementById('totalPnL');
                if(elPnL) {
                    const sP = this.privacyMode ? '••••••' : `${sym} ${totProfit.toLocaleString('pt-BR',{minimumFractionDigits:2})}`;
                    elPnL.innerHTML = `<span class="${totProfit>=0?'text-green-400':'text-red-400'}">${sP} (${totPct.toFixed(2)}%)</span>`;
                }
                
                this.updateTitle(); 
                this.renderHistory();
            }

            renderHistory() {
                const tbody = document.getElementById('historyTableBody');
                if(!tbody) return;
                tbody.innerHTML = '';
                const sym = this.displayCurrency === 'BRL' ? 'R$' : '$';
                
                [...this.transactions].reverse().forEach(tx => {
                    const config = this.coinMap[tx.coinId] || DEFAULT_COINS.bitcoin;
                    const isBuy = tx.type === 'buy';
                    const originalSym = (!tx.currency || tx.currency === 'BRL') ? 'R$' : '$';
                    const icon = this.getIconHtml(config).replace('w-full h-full', 'w-4 h-4').replace('32px', '16px'); 
                    const smallIcon = `<div class="w-4 h-4 mr-2 rounded-full overflow-hidden flex items-center justify-center">${icon}</div>`;
                    
                    const sCost = this.privacyMode ? '••••••' : `${originalSym} ${tx.totalCost.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                    const sQty = this.formatQuantity(tx.amount, config.symbol);
                    
                    // MOSTRAR BREAK-EVEN NA TABELA
                    let beValue = '-';
                    if (tx.breakEven && tx.breakEven > 0) {
                         beValue = this.privacyMode ? '••••••' : `${originalSym} ${tx.breakEven.toLocaleString('pt-BR', {maximumFractionDigits: 2})}`;
                    }

                    tbody.innerHTML += `
                    <tr class="border-b border-gray-800 hover:bg-gray-800/50 transition">
                        <td class="p-3 text-gray-400">${new Date(tx.date).toLocaleDateString()}</td>
                        <td class="p-3 text-white font-bold text-xs flex items-center">${smallIcon} ${config.symbol}</td>
                        <td class="p-3"><span class="text-xs font-bold ${isBuy?'text-green-400':'text-red-400'}">${isBuy?'C':'V'}</span></td>
                        <td class="p-3 text-right text-gray-300 text-xs font-mono">${sQty}</td>
                        <td class="p-3 text-right text-gray-300 text-xs">${sCost}</td>
                        <td class="p-3 text-right text-purple-300 text-xs font-bold">${beValue}</td>
                        <td class="p-3 text-right">
                            <button onclick="app.openEditModal(${tx.id})" class="text-gray-500 hover:text-yellow-400 p-1" title="Editar"><i class="fa-solid fa-pencil"></i></button>
                            <button onclick="app.deleteTransaction(${tx.id})" class="text-gray-500 hover:text-red-500 p-1" title="Excluir"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>`;
                });
            }

            updateLineChart(ids) {
                const canvas = document.getElementById('historyChart');
                if(!canvas) return;
                
                const refId = ids.find(id => this.historyCache[`${id}_usd_365`]);
                if(!refId) return;

                const ctx = canvas.getContext('2d');
                // Fatiar dados do cache 365 dias conforme a seleção atual (30, 90...)
                const fullData = this.historyCache[`${refId}_usd_365`].data;
                const slice = this.chartDays; 
                const slicedRef = fullData.slice(-slice);
                const timestamps = slicedRef.map(p => p[0]);
                
                const isBRL = this.displayCurrency === 'BRL';

                // 1. Patrimônio
                const totalValues = timestamps.map((ts, idx) => {
                    const port = this.getPortfolioAtDate(ts);
                    let tot = 0;
                    ids.forEach(id => {
                        const key = `${id}_usd_365`;
                        if(this.historyCache[key] && port[id]) {
                            const coinData = this.historyCache[key].data.slice(-slice);
                            if(coinData[idx]) {
                                const pUsd = coinData[idx][1];
                                const price = (isBRL && this.rateBrlToUsd > 0) ? pUsd / this.rateBrlToUsd : pUsd;
                                tot += price * port[id];
                            }
                        }
                    });
                    return tot;
                });

                // 2. Preço BTC
                const btcKey = `bitcoin_usd_365`;
                const btcValues = this.historyCache[btcKey] ? this.historyCache[btcKey].data.slice(-slice).map(p => {
                    return (isBRL && this.rateBrlToUsd > 0) ? p[1] / this.rateBrlToUsd : p[1];
                }) : [];

                // 3. Preço Médio Pessoal (Linha Constante - Piso)
                const avgValues = timestamps.map(ts => {
                    const pointDate = new Date(ts); pointDate.setHours(0,0,0,0);

                    let invested = 0; let qty = 0;
                    
                    const txsUntilDate = this.transactions
                        .filter(t => t.coinId === 'bitcoin')
                        .filter(t => {
                            const parts = t.date.split('-');
                            const txDate = new Date(parts[0], parts[1]-1, parts[2]);
                            return txDate <= pointDate;
                        })
                        .sort((a,b) => new Date(a.date) - new Date(b.date));

                    txsUntilDate.forEach(t => {
                        let cost = t.totalCost;
                        const tBRL = (!t.currency || t.currency === 'BRL');
                        if(tBRL !== isBRL && this.rateBrlToUsd > 0) {
                            cost = tBRL ? cost * this.rateBrlToUsd : cost / this.rateBrlToUsd;
                        }

                        if(t.type === 'buy') { 
                            invested += cost; 
                            qty += t.amount; 
                        } else { 
                            const currentAvg = qty > 0 ? invested / qty : 0; 
                            invested -= currentAvg * t.amount; 
                            qty -= t.amount; 
                        }
                    });

                    return qty > 0.00000001 ? (invested / qty) : null;
                });

                if(this.lineChart) this.lineChart.destroy();
                const gradient = ctx.createLinearGradient(0,0,0,400);
                gradient.addColorStop(0, 'rgba(59,130,246,0.5)'); gradient.addColorStop(1, 'rgba(59,130,246,0.0)');

                this.lineChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: timestamps.map(t => new Date(t).toLocaleDateString()),
                        datasets: [
                            { label: 'Patrimônio', data: totalValues, borderColor: '#3b82f6', backgroundColor: gradient, borderWidth: 2, fill: true, pointRadius: 0, pointHoverRadius: 6, yAxisID: 'y' },
                            { label: 'Preço BTC', data: btcValues, borderColor: '#f59e0b', borderDash: [3,3], borderWidth: 1.5, pointRadius: 0, fill: false, yAxisID: 'y1' },
                            { label: 'Meu Médio', data: avgValues, borderColor: '#d946ef', borderDash: [5,5], borderWidth: 2, pointRadius: 0, fill: false, spanGaps: true, yAxisID: 'y1' }
                        ]
                    },
                    options: { 
                        responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, 
                        plugins: { legend: {display:true, labels:{color:'#9ca3af', font:{size:10}}}, tooltip: {mode:'index', intersect:false} },
                        scales: { x: {display:false}, y: {type:'linear', display:true, position:'left', grid:{color:'#374151'}, ticks: {color:'#60a5fa', callback: v=>(v/1000).toFixed(0)+'k'}}, y1: {type:'linear', display:true, position:'right', grid:{drawOnChartArea:false}, ticks: {color:'#f59e0b', callback: v=>(v/1000).toFixed(0)+'k'}} }
                    }
                });
            }

            // --- UTILS ---
            getPortfolioAtDate(ts) {
                const limit = new Date(ts); const coins = {};
                this.transactions.forEach(tx => {
                    const [y,m,d] = tx.date.split('-').map(Number); const txDate = new Date(y, m-1, d, 12, 0, 0);
                    if(txDate <= limit) { if(!coins[tx.coinId]) coins[tx.coinId] = 0; if(tx.type === 'buy') coins[tx.coinId] += tx.amount; else coins[tx.coinId] -= tx.amount; } // Assume que tx.date está no formato YYYY-MM-DD
                }); return coins;
            }
            
            updateDonut(l, d, c) {
                const cv = document.getElementById('portfolioChart');
                const m = document.getElementById('emptyChartMsg');
                if(!cv || typeof Chart === 'undefined') return;
                if(this.donutChart) this.donutChart.destroy();
                if(m) m.classList.toggle('hidden', d.length > 0);

                const total = d.reduce((a, b) => a + b, 0);

                this.donutChart = new Chart(cv.getContext('2d'), {
                    type: 'doughnut',
                    data: {
                        labels: l,
                        datasets: [{data: d, backgroundColor: c, borderWidth: 0}]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '75%',
                        plugins: {
                            legend: {display: false},
                            tooltip: {
                                callbacks: {
                                    label: (context) => {
                                        const label = context.label || '';
                                        const value = context.raw || 0;
                                        const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
                                        const sym = this.displayCurrency === 'BRL' ? 'R$' : '$';
                                        return `${label}: ${this.formatMoney(value, sym)} (${percentage}%)`;
                                    }
                                }
                            }
                        },
                        onClick: (evt, elements) => {
                            if (elements.length > 0) {
                                const clickedIndex = elements[0].index;
                                const clickedLabel = this.donutChart.data.labels[clickedIndex];
                                const coinId = Object.keys(this.coinMap).find(id => this.coinMap[id].name === clickedLabel);

                                if (coinId) {
                                    if (this._currentFilteredCoin === coinId) {
                                        this.fetchHistory(); // Re-fetches all active coins
                                        this._currentFilteredCoin = null;
                                        this.log('Filtro de gráfico removido.', 'info');
                                    } else {
                                        this.updateLineChart([coinId]);
                                        this._currentFilteredCoin = coinId;
                                        this.log(`Gráfico filtrado para ${clickedLabel}.`, 'info');
                                    }
                                }
                            }
                        }
                    }
                });
            }

            calculateMayer(prices) {
                if(!prices || prices.length < 200) return;
                const last200 = prices.slice(-200);
                const sum = last200.reduce((acc, p) => acc + p[1], 0);
                const ma200 = sum / 200;
                const current = last200[last200.length-1][1];
                const mayer = current / ma200;

                const elVal = document.getElementById('mayerValue');
                const elStat = document.getElementById('mayerStatus');
                const elInd = document.getElementById('mayerIndicator');
                
                if(elVal) elVal.innerText = mayer.toFixed(2);
                if(elInd) elInd.style.left = `${Math.min((mayer/3)*100, 100)}%`;
                
                if(elStat) {
                    if(mayer < 0.55) { elStat.innerText = "Desconto"; elStat.className = "text-xs font-bold text-green-400"; }
                    else if(mayer < 1.1) { elStat.innerText = "Acumulação"; elStat.className = "text-xs font-bold text-green-300"; }
                    else if(mayer < 2.4) { elStat.innerText = "Bull Market"; elStat.className = "text-xs font-bold text-yellow-400"; }
                    else { elStat.innerText = "Bolha"; elStat.className = "text-xs font-bold text-red-500"; }
                }
            }

            async fetchFearAndGreed() {
                try {
                    this.log('Buscando Fear & Greed Index...', 'info');
                    const res = await fetch('https://api.alternative.me/fng/?limit=1');
                    if (!res.ok) throw new Error('Failed to fetch F&G');
                    const data = await res.json();
                    const fng = data.data[0];

                    const val = parseInt(fng.value);
                    const classification = fng.value_classification;
                    const timestamp = new Date(fng.timestamp * 1000);

                    const elVal = document.getElementById('fngValue');
                    const elClass = document.getElementById('fngClassification');
                    const elTime = document.getElementById('fngTime');
                    const elIndicator = document.getElementById('fngIndicator');

                    if (elVal) elVal.innerText = val;
                    if (elClass) elClass.innerText = classification;
                    if (elTime) elTime.innerText = `Atualizado: ${timestamp.toLocaleDateString()}`;
                    if (elIndicator) elIndicator.style.left = `${val}%`;

                    // Change color based on classification
                    let colorClass = 'text-gray-400';
                    if (val <= 25) colorClass = 'text-red-400';
                    else if (val <= 45) colorClass = 'text-orange-400';
                    else if (val <= 55) colorClass = 'text-yellow-400';
                    else if (val <= 75) colorClass = 'text-green-300';
                    else colorClass = 'text-green-400';
                    if (elClass) elClass.className = `text-xs text-gray-400 mb-1 ${colorClass}`;

                    this.log('Fear & Greed OK.', 'success');
                } catch (e) {
                    this.log('Erro ao buscar Fear & Greed: ' + e.message, 'error');
                    const elClass = document.getElementById('fngClassification');
                    if(elClass) elClass.innerText = 'Erro';
                }
            }

            // --- Handlers ---
            togglePrivacy() {
                this.privacyMode = !this.privacyMode;
                localStorage.setItem('crypto_privacy', this.privacyMode);
                
                // Atualiza ícone
                const icon = document.getElementById('privacyIconMobile');
                if(icon) icon.className = this.privacyMode ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
                
                // Recalcula tudo para aplicar o blur
                this.calculatePortfolio();
                this.updateTitle();
                
                this.log(this.privacyMode ? 'Privacidade ativada' : 'Privacidade desativada', 'info');
            }
            
            setCurrency(c) { 
                this.displayCurrency = c; 
                localStorage.setItem('crypto_currency', c); 
                this.updateCurrencyUI(); 
                this.calculatePortfolio(); 
                this.fetchHistory(); 
                this.calculateBreakEven(); // <--- ADD THIS
                this.resetConverter();
            }
            updateCurrencyUI() {
                const b1 = document.getElementById('btn-currency-brl'); 
                const b2 = document.getElementById('btn-currency-usd'); 
                const mob_b1 = document.getElementById('mobile-btn-currency-brl');
                const mob_b2 = document.getElementById('mobile-btn-currency-usd');
                const l = document.getElementById('costCurrencyLabel');
                
                if(!b1 || !mob_b1) return;

                const buttons = [[b1, mob_b1], [b2, mob_b2]];

                if(this.displayCurrency === 'BRL') { 
                    buttons[0].forEach(btn => { if(btn) { btn.classList.replace('text-gray-400','text-white'); btn.classList.add('bg-blue-600'); } });
                    buttons[1].forEach(btn => { if(btn) { btn.classList.remove('bg-blue-600','text-white'); btn.classList.add('text-gray-400'); } });
                    if(l) l.innerText = 'R$';
                }
                else { 
                    buttons[1].forEach(btn => { if(btn) { btn.classList.replace('text-gray-400','text-white'); btn.classList.add('bg-blue-600'); } });
                    buttons[0].forEach(btn => { if(btn) { btn.classList.remove('bg-blue-600','text-white'); btn.classList.add('text-gray-400'); } });
                    if(l) l.innerText = 'USD';
                }
            }

            // NOVO: Handler para alterar Unidade (BTC/SATS)
            setUnit(u) {
                this.displayUnit = u;
                localStorage.setItem('crypto_unit', u);
                this.updateUnitUI();
                this.calculatePortfolio();
                this.renderHistory();
            }

            // NOVO: Atualiza visual do botão de Unidade
            updateUnitUI() {
                const b1 = document.getElementById('btn-unit-btc');
                const b2 = document.getElementById('btn-unit-sats');
                const mob_b1 = document.getElementById('mobile-btn-unit-btc');
                const mob_b2 = document.getElementById('mobile-btn-unit-sats');

                if(!b1 || !mob_b1) return;

                const buttons = [[b1, mob_b1], [b2, mob_b2]];
                
                // Atualiza botões da Navbar
                if(this.displayUnit === 'BTC') {
                    buttons[0].forEach(btn => { if(btn) { btn.classList.replace('text-gray-400','text-white'); btn.classList.add('bg-orange-500'); } });
                    buttons[1].forEach(btn => { if(btn) { btn.classList.remove('bg-orange-500','text-white'); btn.classList.add('text-gray-400'); } });
                } else {
                    buttons[1].forEach(btn => { if(btn) { btn.classList.replace('text-gray-400','text-white'); btn.classList.add('bg-orange-500'); } });
                    buttons[0].forEach(btn => { if(btn) { btn.classList.remove('bg-orange-500','text-white'); btn.classList.add('text-gray-400'); } });
                }

                // Atualiza rótulo e placeholder no formulário
                const lbl = document.getElementById('qtyUnitLabel');
                if (lbl) lbl.innerText = this.displayUnit === 'BTC' ? '(BTC)' : '(SATS)';
                
                const inp = document.getElementById('amountInput');
                if(inp) {
                    inp.placeholder = this.displayUnit === 'BTC' ? '0.00000000' : '0';
                    inp.step = this.displayUnit === 'BTC' ? '0.00000001' : '1';
                }
            }

            changeRange(d) { 
                this.chartDays = d; 
                localStorage.setItem('crypto_chart_days', d); // PERSISTÊNCIA
                this.updateRangeUI(); 
                this.fetchHistory(); 
            }
            
            handleAddTransaction(e) { 
                e.preventDefault(); 
                
                let qty = parseFloat(document.getElementById('amountInput').value);
                const unitPrice = parseFloat(document.getElementById('costInput').value);
                
                // SE ESTIVER EM SATS, CONVERTE PARA BTC ANTES DE SALVAR
                if (this.displayUnit === 'SATS') {
                    qty = qty / 100000000;
                }
                
                // Salva o Custo Total no banco (sempre baseado em BTC)
                const totalCost = qty * unitPrice;

                // Calcula Break-even para salvar
                const taxBuy = parseFloat(document.getElementById('taxBuyInput').value) || 0;
                const taxSell = parseFloat(document.getElementById('taxSellInput').value) || 0;

                const taxBuyVal = (totalCost * taxBuy) / 100;
                const totalW = totalCost + taxBuyVal;
                const be = taxSell > 0 ? totalW / (qty * (1 - taxSell/100)) : totalW / qty;

                const tx = { 
                    id: Date.now(), 
                    coinId: document.getElementById('coinSelect').value, 
                    type: document.getElementById('typeSelect').value, 
                    amount: qty, 
                    totalCost: totalCost,
                    taxBuy: taxBuy,
                    taxSell: taxSell,
                    breakEven: be, // Salva o Break-Even calculado
                    currency: this.displayCurrency, 
                    date: document.getElementById('dateInput').value 
                };

                this.transactions.push(tx); localStorage.setItem('crypto_txs', JSON.stringify(this.transactions)); this.calculatePortfolio(); 
                
                e.target.reset(); 
                document.getElementById('dateInput').valueAsDate = new Date(); 
                document.getElementById('smartPriceInfo').classList.add('hidden');
                document.getElementById('calculationSummary').classList.add('hidden');
                
                // Restaura placeholder correto após limpar
                this.updateUnitUI();
                
                this.log('Transação adicionada.', 'success');
                this.fetchHistory();
            }
            
            deleteTransaction(id) { 
                if(confirm('Apagar?')) { 
                    this.transactions = this.transactions.filter(t => t.id !== id); 
                    localStorage.setItem('crypto_txs', JSON.stringify(this.transactions)); 
                    this.calculatePortfolio(); 
                    // IMPORTANTE: Atualiza o gráfico
                    this.fetchHistory();
                } 
            }
            
            clearAllData() { 
                if(confirm('Resetar tudo?')) { 
                    this.transactions = []; 
                    localStorage.setItem('crypto_txs', JSON.stringify(this.transactions)); 
                    this.calculatePortfolio(); 
                    // IMPORTANTE: Atualiza o gráfico
                    this.fetchHistory();
                } 
            }
            
            forceClearCache() { localStorage.removeItem('crypto_prices_cache'); localStorage.removeItem('crypto_history_cache'); this.prices={}; this.refreshAll(true); }
            
            saveSettings(e) { e.preventDefault(); this.apiConfig = { type: document.querySelector('input[name="apiType"]:checked').value, key: document.getElementById('apiKeyInput').value.trim() }; localStorage.setItem('crypto_api_config', JSON.stringify(this.apiConfig)); this.closeSettings(); }
            async smartSave() { const c = JSON.stringify({ transactions: this.transactions, customCoins: safeParse('crypto_custom_coins', {}), version: '1.4' }, null, 2); try { const h = await window.showSaveFilePicker({ suggestedName: 'backup.json', types: [{ description: 'JSON', accept: {'application/json': ['.json']} }] }); const w = await h.createWritable(); await w.write(c); await w.close(); } catch(e) { console.log(e); } }
            importData(input) { 
                const f = input.files[0]; 
                if(!f) return; 
                const r = new FileReader(); 
                r.onload = (e) => { 
                    try { 
                        const d = JSON.parse(e.target.result); 
                        if(confirm(`Restaurar backup com ${d.transactions ? d.transactions.length : 0} transações?`)) { 
                            // Atualiza transações
                            if (d.transactions) {
                                this.transactions = d.transactions;
                                localStorage.setItem('crypto_txs', JSON.stringify(this.transactions));
                            }
                            // Atualiza moedas customizadas
                            if(d.customCoins) {
                                localStorage.setItem('crypto_custom_coins', JSON.stringify(d.customCoins));
                            }
                            alert('Dados restaurados com sucesso! O app será recarregado.');
                            location.reload(); 
                        } 
                    } catch(er) { 
                        console.error(er);
                        alert('Erro ao ler o arquivo JSON. Verifique o formato.'); 
                    } 
                };
                r.readAsText(f); 
                input.value = ''; // Reset input
            }
            
            generateExportCode() { const p = { transactions: this.transactions, customCoins: safeParse('crypto_custom_coins', {}), ts: Date.now() }; document.getElementById('exportCodeInput').value = btoa(JSON.stringify(p)); }
            
            // Função Inteligente de Importação (Aceita Base64 ou JSON Puro)
            importFromCode() { 
                const raw = document.getElementById('importCodeInput').value.trim();
                if (!raw) return alert('Cole algo!');

                try { 
                    let jsonStr = raw;
                    // Tenta decodificar se não começar com {
                    if (!raw.startsWith('{')) {
                        try { jsonStr = atob(raw); } catch(e) { console.warn("Não é base64, tentando JSON direto"); }
                    }
                    
                    const d = JSON.parse(jsonStr); 
                    if(confirm('Restaurar?')) { 
                        this.transactions = d.transactions || []; 
                        localStorage.setItem('crypto_txs', JSON.stringify(this.transactions)); 
                        if(d.customCoins) localStorage.setItem('crypto_custom_coins', JSON.stringify(d.customCoins)); 
                        location.reload(); 
                    } 
                } catch(e) { 
                    alert('Código inválido ou corrompido.'); 
                } 
            }
            
            async searchCoins() { 
                const q = document.getElementById('coinSearchInput').value; const d = document.getElementById('searchResults'); 
                if(q.length<2 || !d) return; d.innerHTML='...'; 
                try { const r = await fetch(this.getApiUrl(`/search?query=${q}`)); const j = await r.json(); d.innerHTML=''; 
                    j.coins.slice(0,10).forEach(c => { 
                        const e = document.createElement('div'); e.className = 'flex justify-between p-2 bg-gray-900/50 rounded mb-2 cursor-pointer hover:bg-gray-800 items-center'; 
                        e.innerHTML = `<span class="text-white font-bold">${c.name}</span><i class="fa-solid fa-plus text-blue-400"></i>`; 
                        e.onclick = () => { 
                            this.coinMap[c.id] = { symbol: c.symbol.toUpperCase(), name: c.name, color: '#9ca3af', image: c.thumb }; 
                            const cu = safeParse('crypto_custom_coins', {}); cu[c.id] = this.coinMap[c.id]; localStorage.setItem('crypto_custom_coins', JSON.stringify(cu)); 
                            this.populateCoinSelect(document.getElementById('coinSelect'));
                            this.populateCoinSelect(document.getElementById('editCoinSelect'));
                            document.getElementById('coinSelect').value = c.id; this.updateFormTheme(); 
                            document.getElementById('searchModal').classList.add('hidden'); this.refreshAll(true); 
                        }; d.appendChild(e); 
                    }); 
                } catch(e) { d.innerHTML='Erro'; } 
            }
            
            copyDonationAddress() { navigator.clipboard.writeText("Bc1qn9gjwevesf8xhqamvt8lcnwmyz4e5lfdqzc7h0"); alert("Bitcoin Address Copied!"); }
            copyLightningAddress() { navigator.clipboard.writeText("arthurmiguel@bipa.app"); alert("Lightning Address Copied!"); }

            showImportWarningModal() {
                console.log("showImportWarningModal called");
                const btcAddressInput = document.getElementById('btcAddressInput');
                const address = btcAddressInput.value.trim();
                const statusDiv = document.getElementById('importBtcStatus');

                if (!address) {
                    statusDiv.innerText = 'Insira um endereço ou xpub.';
                    statusDiv.className = 'text-[10px] text-red-500 mt-2 text-center';
                    return;
                }

                console.log("Address to import:", address);
                this._tempAddressToImport = address; 
                document.getElementById('importWarningModal').classList.remove('hidden');
                this.closeSettings();
            }

            async proceedImportAddress() {
                this.closeImportWarningModal();
                const addressOrXpub = this._tempAddressToImport;
                const statusDiv = document.getElementById('importBtcStatus');
                statusDiv.innerText = 'Buscando transações...';
                statusDiv.className = 'text-[10px] text-blue-400 mt-2 text-center animate-pulse';

                try {
                    const targetUrl = `https://blockchain.info/multiaddr?active=${addressOrXpub}`;
                    const res = await fetch(targetUrl);
                    if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
                    const data = await res.json();
                    if (data.error) throw new Error(`API Error: ${data.error}`);

                    if (!data.txs || data.txs.length === 0) {
                        statusDiv.innerText = 'Nenhuma transação encontrada.';
                        statusDiv.className = 'text-[10px] text-yellow-500 mt-2 text-center';
                        return;
                    }

                    this.transactionsToReview = [];
                    let newTxCount = 0;
                    const SATOSHI_DIVISOR = 1e8;
                    
                    // Usar um loop for...of para poder usar await dentro dele
                    for (const tx of data.txs) {
                        if (!tx.hash || this.transactions.some(t => t.id === tx.hash)) continue;

                        const netAmount = tx.result;
                        if (netAmount === 0) continue;

                        const date = new Date(tx.time * 1000);
                        const dateString = date.toISOString().split('T')[0];
                        const amountBTC = Math.abs(netAmount) / SATOSHI_DIVISOR;
                        
                        const price = await this.getPriceForDate(date);
                        
                        const newTx = {
                            id: tx.hash,
                            coinId: 'bitcoin',
                            type: netAmount > 0 ? 'buy' : 'sell',
                            amount: amountBTC,
                            date: dateString,
                            currency: 'USD',
                            taxBuy: 0, taxSell: 0,
                            totalCost: -1, // Flag para preço não encontrado
                            breakEven: -1,
                        };

                        if (price) {
                            newTx.totalCost = amountBTC * price;
                            newTx.breakEven = price; // Simplificado, sem taxas
                            this.transactions.push(newTx);
                            newTxCount++;
                        } else {
                            // Só adiciona à revisão se for uma COMPRA, vendas não precisam de preço
                            if (newTx.type === 'buy') {
                                this.transactionsToReview.push(newTx);
                            } else {
                                newTx.totalCost = 0; // Venda sem custo de aquisição (não ideal, mas evita o prompt)
                                newTx.breakEven = 0;
                                this.transactions.push(newTx);
                                newTxCount++;
                            }
                        }
                    }

                    if (this.transactionsToReview.length > 0) {
                        this.openManualPriceModal();
                    }

                    if (newTxCount > 0) {
                        localStorage.setItem('crypto_txs', JSON.stringify(this.transactions));
                        statusDiv.innerText = `${newTxCount} transação(ões) importada(s)!`;
                        statusDiv.className = 'text-[10px] text-green-400 mt-2 text-center';
                        this.calculatePortfolio();
                        this.fetchHistory(true);
                    } else if (this.transactionsToReview.length === 0) {
                         statusDiv.innerText = 'Nenhuma transação nova para importar.';
                         statusDiv.className = 'text-[10px] text-gray-500 mt-2 text-center';
                    }

                } catch (error) {
                    console.error("Import failed:", error);
                    statusDiv.innerText = `Falha na importação: ${error.message}.`;
                    statusDiv.className = 'text-[10px] text-red-500 mt-2 text-center';
                } finally {
                    this._tempAddressToImport = null;
                }
            }

            // --- Funções do Conversor ---
            openConverterModal() {
                this.resetConverter();
                document.getElementById('converterModal').classList.remove('hidden');
            }

            closeConverterModal() {
                document.getElementById('converterModal').classList.add('hidden');
            }

            resetConverter() {
                document.getElementById('converterBRL').value = '';
                document.getElementById('converterUSD').value = '';
                document.getElementById('converterBTC').value = '';
                document.getElementById('converterSATS').value = '';
            }

            convertValues(from, value) {
                const btcPrice = this.prices.bitcoin;
                if (!btcPrice) {
                    this.log('Preço do BTC não disponível para conversão.', 'warn');
                    return;
                }

                const val = parseFloat(value);
                if (isNaN(val) || value === '') {
                    this.resetConverter();
                    return;
                }

                let btcValue = 0;

                switch(from) {
                    case 'brl':
                        btcValue = val / btcPrice.brl;
                        break;
                    case 'usd':
                        btcValue = val / btcPrice.usd;
                        break;
                    case 'btc':
                        btcValue = val;
                        break;
                    case 'sats':
                        btcValue = val / 100_000_000;
                        break;
                }

                if (document.activeElement.id !== 'converterBRL') {
                    document.getElementById('converterBRL').value = (btcValue * btcPrice.brl).toFixed(2);
                }
                if (document.activeElement.id !== 'converterUSD') {
                    document.getElementById('converterUSD').value = (btcValue * btcPrice.usd).toFixed(2);
                }
                if (document.activeElement.id !== 'converterBTC') {
                    document.getElementById('converterBTC').value = btcValue.toFixed(8);
                }
                if (document.activeElement.id !== 'converterSATS') {
                    document.getElementById('converterSATS').value = (btcValue * 100_000_000).toFixed(0);
                }
            }

            exportToCsv() {
                if (this.transactions.length === 0) {
                    alert("Nenhuma transação para exportar.");
                    return;
                }

                const headers = [
                    "ID", "Data", "Ativo", "Symbol", "Tipo", "Quantidade", 
                    "Valor Total", "Moeda", "Break-even", "Taxa Compra (%)", "Taxa Venda (%)"
                ];

                const csvRows = [headers.join(',')];

                for (const tx of this.transactions) {
                    const config = this.coinMap[tx.coinId] || {};
                    const row = [
                        tx.id,
                        tx.date,
                        config.name || tx.coinId,
                        config.symbol || '',
                        tx.type,
                        tx.amount,
                        tx.totalCost,
                        tx.currency,
                        tx.breakEven || 0,
                        tx.taxBuy || 0,
                        tx.taxSell || 0
                    ].join(',');
                    csvRows.push(row);
                }

                const csvString = csvRows.join('\n');
                const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement("a");
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", "crypto_control_transacoes.csv");
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            async getPriceForDate(date) {
                const dateString = date.toISOString().split('T')[0];
                
                // 1. Checar base de dados local (bitcoin.xlsx)
                if (this.localData[dateString]) {
                    this.log(`Preço encontrado no arquivo local para ${dateString}: $${this.localData[dateString]}`, 'info');
                    return this.localData[dateString];
                }

                // 2. Checar API da CoinGecko
                try {
                    this.log(`Buscando preço na API para ${dateString}...`, 'info');
                    this.setApiStatusUI('Buscando Histórico...', 'busy');
                    // Formato da API é DD-MM-YYYY
                    const apiDate = date.toLocaleDateString('pt-BR').split('/').reverse().join('-');
                    const formattedApiDate = `${apiDate.split('-')[2]}-${apiDate.split('-')[1]}-${apiDate.split('-')[0]}`;

                    const url = this.getApiUrl(`/coins/bitcoin/history?date=${formattedApiDate}&localization=false`);
                    const res = await fetch(url);
                    
                    if (res.status === 429) {
                        this.log('Rate limit da API para preços históricos. Aguardando...', 'warn');
                        await new Promise(r => setTimeout(r, this.queueDelay * 2)); // Espera extra
                        return this.getPriceForDate(date); // Tenta novamente
                    }
                    if (!res.ok) throw new Error(`API status ${res.status}`);

                    const data = await res.json();
                    if (data.market_data?.current_price?.usd) {
                        const price = data.market_data.current_price.usd;
                        this.log(`Preço encontrado na API para ${dateString}: $${price}`, 'success');
                        this.setApiStatusUI('API OK', 'live');
                        return price;
                    }
                } catch (e) {
                    this.log(`Falha ao buscar preço na API para ${dateString}: ${e.message}`, 'error');
                    this.setApiStatusUI('Erro API', 'error');
                }

                return null; // Retorna null se não encontrar em lugar nenhum
            }

            openManualPriceModal() {
                const formBody = document.getElementById('manualPriceForm');
                formBody.innerHTML = ''; // Limpa antes de preencher

                this.transactionsToReview.forEach((tx, index) => {
                    formBody.innerHTML += `
                        <div class="grid grid-cols-3 gap-3 items-center mb-2 bg-gray-900/50 p-2 rounded">
                            <div class="text-xs text-gray-400">
                                <div>${new Date(tx.date).toLocaleDateString()}</div>
                                <div class="font-mono">${tx.amount.toFixed(6)} BTC</div>
                            </div>
                            <div class="col-span-2">
                                <label class="text-[10px] text-gray-400 block mb-1">Preço Unitário (USD) na data</label>
                                <input type="number" step="0.01" data-tx-index="${index}" required class="manual-price-input w-full bg-gray-900 border border-gray-600 rounded p-2 text-xs text-white" placeholder="0.00">
                            </div>
                        </div>
                    `;
                });

                document.getElementById('manualPriceModal').classList.remove('hidden');
                this.log(`Aguardando preenchimento manual para ${this.transactionsToReview.length} transação(ões).`, 'warn');
            }

            cancelManualPriceEntry() {
                if (confirm('Deseja cancelar a importação destas transações? Elas não serão adicionadas.')) {
                    this.transactionsToReview = [];
                    document.getElementById('manualPriceModal').classList.add('hidden');
                    this.log('Importação manual cancelada.', 'info');
                }
            }

            submitManualPrices() {
                const inputs = document.querySelectorAll('.manual-price-input');
                let allValid = true;

                inputs.forEach(input => {
                    const price = parseFloat(input.value);
                    if (isNaN(price) || price <= 0) {
                        input.classList.add('border-red-500');
                        allValid = false;
                    } else {
                        input.classList.remove('border-red-500');
                        const index = parseInt(input.dataset.txIndex);
                        const tx = this.transactionsToReview[index];
                        
                        tx.totalCost = tx.amount * price;
                        tx.breakEven = price; // Simplificado
                        
                        this.transactions.push(tx);
                    }
                });

                if (!allValid) {
                    alert('Por favor, preencha todos os preços com valores válidos.');
                    return;
                }

                localStorage.setItem('crypto_txs', JSON.stringify(this.transactions));
                this.log(`${this.transactionsToReview.length} transação(ões) adicionada(s) com preço manual.`, 'success');
                
                this.transactionsToReview = [];
                document.getElementById('manualPriceModal').classList.add('hidden');
                
                this.calculatePortfolio();
                this.fetchHistory(true);
            }
            
            runSimulation() {
                const t = parseFloat(document.getElementById('simPriceInput').value); if (!t) return alert('Valor inválido');
                const btc = this.prices.bitcoin ? this.prices.bitcoin.usd : 0; if (btc === 0) return alert('Aguarde dados...');
                const g = t / btc; let proj = 0;
                Object.keys(this.coinMap).forEach(id => {
                    const qty = this.transactions.filter(tx => tx.coinId === id).reduce((acc, tx) => tx.type === 'buy' ? acc + tx.amount : acc - tx.amount, 0);
                    if (qty > 0) { const p = this.prices[id] ? this.prices[id].usd : 0; const val = qty * p; proj += (id === 'bitcoin' ? qty * t : val * g); } // Se for BTC, usa o preço simulado; senão, aplica o mesmo crescimento percentual.
                });
                if (this.displayCurrency === 'BRL' && this.rateBrlToUsd > 0) proj = proj / this.rateBrlToUsd;
                const sym = this.displayCurrency === 'BRL' ? 'R$' : '$';
                document.getElementById('simResult').classList.remove('hidden');
                const displayProj = this.privacyMode ? '••••••' : `${sym} ${proj.toLocaleString('pt-BR', {maximumFractionDigits:2})}`;
                document.getElementById('simTotalValue').innerText = displayProj;
                const displayGrowth = this.privacyMode ? '••••' : `${(g*100-100).toFixed(1)}%`;
                document.getElementById('simProfit').innerText = `Crescimento: ${displayGrowth}`;
            }

            // --- Gerenciamento do Modal de Edição ---
            openEditModal(txId) {
                const tx = this.transactions.find(t => t.id === txId);
                if (!tx) return;

                // Preenche os campos do modal
                document.getElementById('editTxId').value = tx.id;
                document.getElementById('editCoinSelect').value = tx.coinId;
                document.getElementById('editTypeSelect').value = tx.type;
                document.getElementById('editAmountInput').value = tx.amount;
                // O custo unitário é o custo total dividido pela quantidade
                document.getElementById('editCostInput').value = (tx.totalCost / tx.amount).toFixed(2);
                document.getElementById('editDateInput').value = tx.date;
                document.getElementById('editTaxBuyInput').value = tx.taxBuy || 0;
                document.getElementById('editTaxSellInput').value = tx.taxSell || 0;

                // Exibe o modal
                document.getElementById('editTxModal').classList.remove('hidden');
            }

            closeEditModal() {
                document.getElementById('editTxModal').classList.add('hidden');
            }

            handleUpdateTransaction(e) {
                e.preventDefault();

                const txId = parseInt(document.getElementById('editTxId').value);
                const txIndex = this.transactions.findIndex(t => t.id === txId);
                if (txIndex === -1) {
                    alert("Erro: Transação não encontrada!");
                    return;
                }

                const qty = parseFloat(document.getElementById('editAmountInput').value);
                const unitPrice = parseFloat(document.getElementById('editCostInput').value);
                const totalCost = qty * unitPrice;
                const taxBuy = parseFloat(document.getElementById('editTaxBuyInput').value) || 0;
                const taxSell = parseFloat(document.getElementById('editTaxSellInput').value) || 0;

                const taxBuyVal = (totalCost * taxBuy) / 100;
                const totalW = totalCost + taxBuyVal;
                const be = taxSell > 0 ? totalW / (qty * (1 - taxSell/100)) : totalW / qty;

                // Atualiza a transação
                const updatedTx = {
                    ...this.transactions[txIndex], // Mantém propriedades originais
                    coinId: document.getElementById('editCoinSelect').value,
                    type: document.getElementById('editTypeSelect').value,
                    amount: qty,
                    totalCost: totalCost,
                    date: document.getElementById('editDateInput').value,
                    taxBuy: taxBuy,
                    taxSell: taxSell,
                    breakEven: be
                };
                
                this.transactions[txIndex] = updatedTx;

                localStorage.setItem('crypto_txs', JSON.stringify(this.transactions));
                this.calculatePortfolio();
                this.fetchHistory();
                this.closeEditModal();
                this.log('Transação atualizada.', 'success');
            }
            

            async smartFetchPrice() {
                const dateInput = document.getElementById('dateInput');
                const coinSelect = document.getElementById('coinSelect');
                const infoBox = document.getElementById('smartPriceInfo');
                const infoText = document.getElementById('smartPriceText');
                const priceInput = document.getElementById('costInput');

                if (!dateInput.value || !coinSelect.value) return infoBox.classList.add('hidden');

                const selectedDate = new Date(dateInput.value); selectedDate.setHours(0,0,0,0);
                const today = new Date(); today.setHours(0,0,0,0);
                if (selectedDate >= today) return infoBox.classList.add('hidden');

                infoBox.classList.remove('hidden');
                infoText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Buscando...';
                
                const price = await this.getPriceForDate(new Date(dateInput.value));

                if (price) {
                    const isBRL = this.displayCurrency === 'BRL';
                    // A função getPriceForDate sempre retorna USD, então precisamos converter se necessário
                    const displayPrice = isBRL ? price / this.rateBrlToUsd : price;
                    priceInput.value = displayPrice.toFixed(2);
                    infoText.innerHTML = `<i class="fa-solid fa-check-circle text-green-400"></i> Preço (USD) de ${new Date(dateInput.value).toLocaleDateString()} encontrado: ${price.toFixed(2)}`;
                    this.calculateBreakEven();
                } else {
                    infoText.innerHTML = '<i class="fa-solid fa-times-circle text-red-400"></i> Preço não encontrado.';
                }
            }

            // ===== BREAK-EVEN PRICE: Calcula Total Gasto e Ponto de Empate =====
            calculateBreakEven() {
                const qtyVal = parseFloat(document.getElementById('amountInput').value) || 0;
                const costVal = parseFloat(document.getElementById('costInput').value) || 0;
                
                let qty = qtyVal;
                if (this.displayUnit === 'SATS') {
                    qty = qtyVal / 100000000;
                }

                if (qty <= 0 || costVal <= 0) {
                    document.getElementById('calculationSummary').classList.add('hidden');
                    return;
                }
                
                document.getElementById('calculationSummary').classList.remove('hidden');

                const totalCost = qty * costVal;
                
                const taxBuy = parseFloat(document.getElementById('taxBuyInput').value) || 0;
                const taxSell = parseFloat(document.getElementById('taxSellInput').value) || 0;

                const taxBuyVal = (totalCost * taxBuy) / 100;
                const totalW = totalCost + taxBuyVal;
                const be = taxSell > 0 ? totalW / (qty * (1 - taxSell/100)) : totalW / qty;
                
                const sym = this.displayCurrency === 'BRL' ? 'R$' : '$';
                
                document.getElementById('calcTotalValue').innerText = this.formatMoney(totalCost, sym);
                document.getElementById('calcBreakEvenValue').innerText = this.formatMoney(be, sym);
            }
        }

        const app = new CryptoApp();

        // --- Lógica do Menu Mobile ---
        const mobileMenu = document.getElementById('mobile-menu');
        const sidebar = document.getElementById('mobile-menu-sidebar');
        const openBtn = document.getElementById('mobile-menu-open-button');
        const closeBtn = document.getElementById('mobile-menu-close-button');

        const openMenu = () => {
            if (mobileMenu && sidebar) {
                mobileMenu.classList.remove('hidden');
                setTimeout(() => {
                    sidebar.classList.remove('-translate-x-full');
                }, 10); 
            }
        };

        const closeMenu = () => {
            if (mobileMenu && sidebar) {
                sidebar.classList.add('-translate-x-full');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
        };

        if (openBtn) openBtn.addEventListener('click', openMenu);
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);

        if (mobileMenu) {
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    closeMenu();
                }
            });
        }
    
