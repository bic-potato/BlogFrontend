/*
 * @Author: ZuoXichen
 * @Date: 2022-08-29 23:21:11
 * @LastEditTime: 2022-08-30 10:24:53
 * @LastEditors: ZuoXichen
 * @Description: 
 */
interface TypechoContent
    {

        cid: number
        title: string 
        slug: string
        created: string 
        modified: string 
        text: string 
        order: number 
        author: string 
        template: string 
        type: string 
        status: string 
        commentsNum: string 
        sllowComment: string  
        allowPing: string  
        allowFeed: string  
        parent: number 
        views: number 
    }

export type {TypechoContent}