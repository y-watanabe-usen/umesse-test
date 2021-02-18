const { constants, debuglog } = require("umesse-lib/constants");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");

// TODO: File分割した方が良い.
var User = {
    find: async function (unisCustomerCd) {
        const key = { unisCustomerCd: unisCustomerCd };
        const options = {
            ProjectionExpression:
                "unisCustomerCd," +
                "contractCd," +
                "serviceCd," +
                "serviceName," +
                "customerName," +
                "customerNameKana," +
                "customerGroupCd," +
                "customerGroupName," +
                "contractStatusCd," +
                "contractStatusName," +
                "createDate," +
                "renewalDate",
        };
        const res = await dynamodbManager.get(constants.dynamoDbTable().users, key, options);
        if (!res || !res.Item) throw new Error("not found");
        return res.Item;
    },
    findCm: async function (unisCustomerCd) {
        const key = { unisCustomerCd: unisCustomerCd };
        const options = {
            ProjectionExpression: "cm",
        };

        let res = await dynamodbManager.get(
            constants.dynamoDbTable().users,
            key,
            options);
        if (!res || !res.Item) throw new Error("not found");
        return res.Item.cm;
    },
    findCategory: async function (unisCustomerCd, category) {
        const key = { unisCustomerCd: unisCustomerCd };
        const options = {
            ProjectionExpression: category,
        };
        debuglog(JSON.stringify({ key: key, options: options }));

        let res = await dynamodbManager.get(
            constants.dynamoDbTable().users,
            key,
            options);
        if (!res || !res.Item) throw new Error("not found");

        return res.Item[category];
    },
    updateData: async function (unisCustomerCd, category, data) {
        const key = { unisCustomerCd: unisCustomerCd };
        const options = {
            UpdateExpression: "SET #category = list_append(#category, :data)",
            ExpressionAttributeNames: {
                "#category": category,
            },
            ExpressionAttributeValues: {
                ":data": [data],
            },
            ReturnValues: "UPDATED_NEW",
        };
        debuglog(JSON.stringify({ key: key, options: options }));

        let res = await dynamodbManager.update(
            constants.dynamoDbTable().users,
            key,
            options);
        if (!res) throw new Error("update failed");
        let json = res.Attributes[category].pop();
        return json;

    },
    addCm: async function (unisCustomerCd, data) {
        const key = { unisCustomerCd: unisCustomerCd };
        const options = {
            UpdateExpression: "SET cm = list_append(cm, :cm)",
            ExpressionAttributeValues: {
                ":cm": [data],
            },
            ReturnValues: "UPDATED_NEW",
        };
        debuglog(JSON.stringify({ key: key, options: options }));

        let res;
        res = await dynamodbManager.update(
            constants.dynamoDbTable().users,
            key,
            options
        );
        if (!res) throw new Error("update failed");

        let json = res.Attributes.cm.pop();
        return json;
    },
    updateCm: async function (unisCustomerCd, index, cm) {
        const key = { unisCustomerCd: unisCustomerCd };
        const options = {
            UpdateExpression: `SET cm[${index}] = :cm`,
            ExpressionAttributeValues: {
                ":cm": cm,
            },
            ReturnValues: "UPDATED_NEW",
        };
        debuglog(JSON.stringify({ key: key, options: options }));

        res = await dynamodbManager.update(
            constants.dynamoDbTable().users,
            key,
            options
        );
        if (!res) throw new Error("update failed");

        return res.Attributes.cm[index];
    },
    updateResource: async function (unisCustomerCd, category, resource) {
        const key = { unisCustomerCd: unisCustomerCd };
        const options = {
            UpdateExpression: `SET #category[${index}] = :resource`,
            ExpressionAttributeNames: {
                "#category": category,
            },
            ExpressionAttributeValues: {
                ":resource": resource,
            },
            ReturnValues: "UPDATED_NEW",
        };
        debuglog(JSON.stringify({ key: key, options: options }));

        let res = await dynamodbManager.update(
            constants.dynamoDbTable().users,
            key,
            options
        );
        if (!res) throw new Error("update failed");
        return res.Attributes[category][index];
    },
    deleteFromCategory: async function (unisCustomerCd, index, category) {
        const key = { unisCustomerCd: unisCustomerCd };
        const options = {
            UpdateExpression: `REMOVE #category[${index}]`,
            ExpressionAttributeNames: {
                "#category": category,
            },
            ReturnValues: "UPDATED_NEW",
        };
        debuglog(JSON.stringify({ key: key, options: options }));

        let res = await dynamodbManager.update(
            constants.dynamoDbTable().users,
            key,
            options
        );
        if (!res) throw new Error("update failed");
        let json = res.Attributes[category];
        return json;
    }
}

var External = {
    findAll: async function (unisCustomerCd) {
        const options = {
            KeyConditionExpression: "unisCustomerCd = :unisCustomerCd",
            ExpressionAttributeValues: {
                ":unisCustomerCd": unisCustomerCd,
            },
        };
        let res = await dynamodbManager.query(
            constants.dynamoDbTable().external,
            options
        );
        if (!res || !res.Items.length) throw new Error("not found");

        let json = res.Items;
        if (!json) throw new Error("not found");
        return json;
    },
    findById: async function (unisCustomerCd, cmId) {
        let json = await this.findAll(unisCustomerCd);
        if (cmId) {
            json = json.filter((item) => item.cmId === cmId)[0];
        }
        if (!json) throw new Error("not found");
        return json;
    },
    /// Add Item.
    add: async function (item) {
        let res = await dynamodbManager.put(
            constants.dynamoDbTable().external,
            item,
            {}
        );
        if (!res) throw new Error("put failed");
        return res;
    },
    findByUploadSystem: async function (uploadSystem) {
        const options = {
            FilterExpression: "uploadSystem = :uploadSystem AND #status = :status",
            ExpressionAttributeNames: {
                "#status": "status",
            },
            ExpressionAttributeValues: {
                ":uploadSystem": uploadSystem,
                ":status": "1",
            },
        };
        let res = await dynamodbManager.scan(
            constants.dynamoDbTable().external,
            options
        );
        if (!res || !res.Items.length) throw new Error("not found");
        return res.Items;
    },
    delete: async function (unisCustomerCd) {
        const key = { unisCustomerCd: unisCustomerCd };
        res = await dynamodbManager.delete(
            constants.dynamoDbTable().external,
            key,
            {});
        if (!res) throw new Error("delete failed");
        return res;
    },
    updateErrorData: async function (unisCustomerCd, data) {
        const key = { unisCustomerCd: unisCustomerCd };
        let options = {
            UpdateExpression:
                "SET #status = :status, errorCode = :errorCode, errorMessage = :errorMessage, #timestamp = :timestamp",
            ExpressionAttributeNames: {
                "#status": "status",
                "#timestamp": "timestamp",
            },
            ExpressionAttributeValues: data,
            ReturnValues: "UPDATED_NEW",
        };
        let res = await dynamodbManager.update(
            constants.dynamoDbTable().external,
            key, data);
        if (!res) throw new InternalServerError("update failed");
        return res;
    }
}

var Contents = {
    findByCategory: async function (category) {
        const options = {
            FilterExpression: "category = :category",
            ExpressionAttributeValues: {
                ":category": category,
            },
        };
        let res = await dynamodbManager.scan(
            constants.dynamoDbTable().contents,
            options
        );
        if (!res || !res.Items.length) throw new Error("not found");
        return res.Items;
    }
}

module.exports = {
    User,
    External,
    Contents
}