type Props = {
  url?: string;
  title: string;
  description: string;
  additionallyStylesForImagesBlock?: string;
  additionallyStylesForImage?: string;
  additionallyStylesForMainBlock?: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function PlaceholderCard({
  url,
  title,
  description,
  additionallyStylesForImagesBlock,
  additionallyStylesForMainBlock,
  additionallyStylesForImage,
  Icon,
}: Props) {
  return (
    <div
      className={`w-full
      shadow-sm rounded-md border border-dashed
      flex items-center justify-start
      fade-in  slide-in
      ${additionallyStylesForMainBlock}
      `}
    >
      {url && (
        <div
          className={`relative w-[250px] overflow-hidden ${additionallyStylesForImagesBlock}`}
        >
          <img
            src={url}
            alt="Иллюстрация пустого состояния"
            className={`absolute inset-0 w-full h-full object-cover ${additionallyStylesForImage}`}
          />
        </div>
      )}

      <div className="space-y-0">
        <div className="flex gap-2 items-center">
          {Icon && <Icon className="w-4 h-4" />}

          <h3 className="text-lg font-semibold text-gray-900 max-w-md">
            {title}
          </h3>
        </div>
        <p className="text-sm text-gray-500 max-w-md">{description}</p>
        {/* <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm">
              <IdCard className="h-4 w-4" />
              Документация
            </Button>
          </div> */}
      </div>
    </div>
  );
}
