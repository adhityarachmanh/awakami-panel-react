export type QueryOperator =
  | 'EQUAL'
  | 'NOT_EQUAL'
  | 'GREATER_THAN'
  | 'LESS_THAN'
  | 'GREATER_THAN_OR_EQUAL'
  | 'LESS_THAN_OR_EQUAL'
  | 'ILIKE'
  | 'BETWEEN'
  | 'IN'
  | 'NOT_IN';

export type SortOrder = 'ASC' | 'DESC';

export type FilterTypes = 'BOOLEAN' | 'DATE' | 'DATETIME' | 'INTEGER' | 'FLOAT' | 'STRING';

export type PostSort = {
  key: string;
  order: SortOrder;
};

type PrimitiveTypes = number | boolean | string;

export type PostFilter = {
  key: string;
  operator: QueryOperator;
  // type: FilterTypes;
  values?: PrimitiveTypes[];
};

export type PostQuery = {
  keywords?: string;
  filters?: PostFilter[];
  sorts?: PostSort[];
  page: number;
  size: number;
};

