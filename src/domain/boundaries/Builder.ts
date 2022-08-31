export interface Builder<Model> {
  build: (overrides?: Partial<Model>) => Model
}
