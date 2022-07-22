import { GraphQLScalarType, Kind } from 'graphql'


function toObject(value){
    if(typeof value === 'object'){
        return value
    }
    if(typeof value === "string" && value.charAt(0) === "{"){
        return JSON.parse(value)
    }
    return null
}
function parseLiteral(valueNode){
    switch(valueNode.kind) {
        case Kind.STRING:
            return valueNode.value.charAt(0) === '{'? JSON.parse(valueNode.value): valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT: 
                
    }
}

const anyType = new GraphQLScalarType({
    name: "anyType",
    parseValue : toObject,
    serialize : toObject,
    parseLiteral : parseLiteral,
})

export default anyType