export const roles = Object.freeze({
    ADMIN : 'ADMIN',
    WRITER : 'WRITER',
    USER : 'USER',
    SUPLIER : 'SUPLIER',
    TEACHER : 'TEACHER'
})

export const permissions = Object.freeze({
    ADMIN : ['ALL'],
    WRITER : ['BLOG' , 'CATEGORY'],
    USER : ['USER'],
    SUPLIER : ['PRODUCT' , 'CATEGORY'],
    TEACHER : ['COURSE' , 'CATEGORY']

})