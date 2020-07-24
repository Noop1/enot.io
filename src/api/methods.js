const fetch = require("node-fetch"),
    {
        URLSearchParams
    } = require("url"),
    sha256 = require("sha256"),
    md5 = require('md5'),
    ip = require('ip'),
    express = require("express"),
    app = express(),
    {
        APIError
    } = require("./apierror");

class API {
    constructor(enot) {
        this.enot = enot;
        this.agent = this.enot.agent;
        this.apiUrl = this.enot.apiUrl;
        this.options = this.enot.options;

        if (!this.options.apiKey) {
            throw new APIError(`Invalid apiKey`)
        } else if (!this.options.secretWord) {
            throw new APIError(`Invalid secretWord`)
        } else if (!this.options.email) {
            throw new APIError(`Invalid email`)
        }
    }
    /**
     * Getting the balance
     */
    getBalance() {
        return this.call({
            method: "balance",
            params: {
                api_key: this.options.apiKey,
                email: this.options.email   
            }
        });
    }
    /**
     * Creating a payment link
     */
    createPaymentLink(params = {}) {
        const word = this.options.secretWord;
        return new Promise(function (resolve, reject) {
            if (!params.merchant) {
                throw new APIError(`Invalid merchant id`)
            } else if (!params.amount) {
                throw new APIError(`Invalid amount`)
            } else if (!params.currency) {
                throw new APIError(`Invalid currency`)
            } else if (!params.pay_id) {
                throw new APIError(`Invalid pay id`)
            } else if (!params.params) {
                throw new APIError(`Specify paramert / parameters`)
            }
            let start = Date.now()
            let url = `https://enot.io/pay?`
            let parameters = new URLSearchParams({
                m: params.merchant,
                oa: params.amount,
                o: params.pay_id,
                cr: params.currency,
                c: params.desc ? params.desc : 'Оплата товара',
                ...params.params,
                s: md5(
                    `${params.merchant}:${params.amount}:${word}:${params.pay_id}`
                )
            })
            let end = Date.now() - start;

            return resolve({
                url: url + parameters,
                ping: end + 'ms'
            });
        })
    }
    /**
     *
     * @param {NumberConstructor} projectId
     */
    getPaymentMethods(projectId) {
        if (!projectId) {
            throw new APIError("Invalid project id");
        }
        const word = this.options.secretWord;
        return this.call({
            method: "payment-methods",
            params: {
                merchant_id: projectId,
                secret_key: word
            }
        });
    }
    /**
     *
     * @param {NumberConstructor} tranId
     */
    getPaymentInfo(tranId) {
        if (!tranId) {
            throw new APIError("Invalid transaction id");
        }

        const apiKey = this.options.apiKey;
        const email = this.options.email;

        return this.call({
            method: "payment-info",
            params: {
                api_key: apiKey,
                email: email,
                id: tranId,
            },
        });
    }
    /**
     *
     * @param {NumberConstructor} projectId
     * @param {NumberConstructor} withId
     */
    getPayoutInfo(projectId, withId) {
        const apiKey = this.options.apiKey;
        const email = this.options.email;
        if (!projectId) {
            throw new APIError("Invalid project id");
        } else if (!withId) {
            throw new APIError(
                "Specify the amount needed to select specific subset transactions"
            );
        }

        return this.call({
            method: "payoff-info",
            params: {
                api_key: apiKey,
                email: email,
                id: withId,
            },
        });
    }
    /**
     *
     * @param {JSON} params
     */
    createPayout(params = {}) {
        const apiKey = this.options.apiKey;
        const email = this.options.email;
        if (!params.service) {
            throw new APIError(
                "Invalid service"
            );
        } else if (!params.amount) {
            throw new APIError("You did not specify the withdrawal amount.");
        } else if (params.amount < 50) {
            throw new APIError("The minimum withdrawal of funds from 50 rubles.");
        } else if (!params.wallet) {
            throw new APIError("Enter wallet / card number.");
        } 

        return this.call({
            method: "payoff",
            params: {
                api_key: apiKey,
                email: email,
                ...params
            },
        });
    }

    async createSession(ports, params = {}) {
        var port = ports || process.env.PORT

        if (!params.url) {
            throw new APIError(`You did not indicate what address the requests will come.`)
        }
        if (!params.handler) {
            throw new APIError(`Specify the handler`)
        }

        app.get(params.url, async function (req, res) {
            await params.handler(req, res);
        })

        app.listen(port, function (err) {
            if (err) {
                throw new APIError(`Error:\n${err}`)
            }

            console.log(`STARTED SESSION:\nURL: http://${ip.address()}:${port}${params.url}`);
        });
    }
    /**
     *
     * @param {JSON} request
     */
    async call(request = {}) {
        let response,
            headers = {
                "Content-Type": "application/json",
                connection: "keep-alive",
            };
        let url = null,
            body = null;

        let __return;
        ({
            __return,
            url,
            response
        } = await this.callMethod(
            request,
            url,
            response,
            headers,
            body
        ));
        return __return;
    }
    /**
     *
     * @param {*} request
     * @param {*} url
     * @param {json} response
     * @param {json} headers
     * @param {*} body
     */
    async callMethod(request, url, response, headers, body) {
        if (request.params) {
            url = this.generateUrl({
                url: `${this.apiUrl}/${request.method}?`,
                query: request.params,
            });
        } else if (!request.sign) {
            url = `${this.apiUrl}/${request.method}`;
        } else if (request.sign) {
            url = `${this.apiUrl}/${request.method}/`;
        }
        response = await fetch(url, {
            method: "GET",
            headers: headers,
            body,
            agent: this.agent,
        });
        this.response = await response.json();
        return {
            __return: this.response,
            url,
            response
        };
    }

    generateUrl(params = {}) {
        let url = `${params.url}${new URLSearchParams(params.query)}`;

        return url;
    }
    
}

exports.API = API;