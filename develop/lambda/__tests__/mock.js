"use strict";

const mockDynamodb = jest.fn();
const mockS3 = jest.fn();

jest.mock("aws-sdk", () => {
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => {
        return {
          scan: () => {
            return {
              promise: mockDynamodb,
            };
          },
          query: () => {
            return {
              promise: mockDynamodb,
            };
          },
          get: () => {
            return {
              promise: mockDynamodb,
            };
          },
          put: () => {
            return {
              promise: mockDynamodb,
            };
          },
          update: () => {
            return {
              promise: mockDynamodb,
            };
          },
          delete: () => {
            return {
              promise: mockDynamodb,
            };
          },
        };
      }),
    },
    S3: jest.fn(() => {
      return {
        getObject: () => {
          return {
            promise: mockS3,
          };
        },
        putObject: () => {
          return {
            promise: mockS3,
          };
        },
        copyObject: () => {
          return {
            promise: mockS3,
          };
        },
        listObjectsV2: () => {
          return {
            promise: mockS3,
          };
        },
        deleteObject: () => {
          return {
            promise: mockS3,
          };
        },
        getSignedUrl: () => {
          return {
            promise: mockS3,
          };
        },
      };
    }),
  };
});

exports.setDynamodbData = (data) => mockDynamodb.mockResolvedValue(data);
exports.setS3Data = (data) => mockS3.mockResolvedValue(data);
