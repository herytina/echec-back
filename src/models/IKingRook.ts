export interface IKingRook{
  white: boolean,
  black: boolean
}

export interface IRookMoved{
  white: { left: boolean, right: boolean },
  black: { left: boolean, right: boolean }
}
