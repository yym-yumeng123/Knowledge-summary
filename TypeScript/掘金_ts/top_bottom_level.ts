type Result = 'yym' extends string ? 1 : 2

declare let source: string
declare let anyType: any
declare let neverType: never

anyType = source
neverType = source