import * as Joi from '@hapi/joi';

const outcomeSchemaList = Joi.array().length(3).items(Joi.number().valid(0, 1, 2, 3, 4, 5));

export const outcomeSchema = Joi.object({ value: outcomeSchemaList });
