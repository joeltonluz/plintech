export type CategoryDto = {
  id: string;
  name: string;
};

export type AddCategoryDto = Omit<CategoryDto, 'id'>;
