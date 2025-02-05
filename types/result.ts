export type Result<T> =
  | {
      success: false
      message: string
    }
  | {
      success: true
      data: T
    }
