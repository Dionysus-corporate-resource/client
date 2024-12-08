import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

type Iprops = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  versionApp: string;
};

export type IDocumentation = {
  newFuatures?: string[];
  newUpdate?: string[];
  newBugFixes?: string[];
};

const documentation: IDocumentation = {
  newFuatures: [
    "Добавлены страница для создания заявок, отдельно для менеджеров",
    "Добавлено модальное окно с профилем, пока без контента, с заглушками",
    "Возможность скопировать шаблон для рассылки в каждой заявке и скопировать все шаблоны заявок в правом верхнем углу, в открывающемся меню",
    "Добавлен поиск и сортировка по 4 критериям",
  ],
};

export default function ChangelogDialog({
  isOpen,
  setIsOpen,
  versionApp,
}: Iprops) {
  return (
    <>
      {/* <Button onClick={() => setIsOpen(true)}>Что нового?</Button> */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-xl h-fit">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Что нового в этой версии
              <Badge variant="secondary">v{versionApp}</Badge>
            </DialogTitle>
            <DialogDescription>Обновление от ...</DialogDescription>
          </DialogHeader>
          <ScrollArea className="mt-4 pr-4 mb-6">
            <div className="space-y-4">
              {documentation?.newFuatures && (
                <>
                  <div>
                    <h3 className="font-semibold text-lg">Новые функции</h3>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {documentation?.newFuatures.map((str) => (
                        <li key={str}>{str}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {documentation?.newUpdate && (
                <>
                  <Separator />

                  <div>
                    <h3 className="font-semibold text-lg">Улучшения</h3>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {documentation?.newUpdate.map((str) => (
                        <li key={str}>{str}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {documentation?.newBugFixes && (
                <>
                  <Separator />

                  <div>
                    <h3 className="font-semibold text-lg">
                      Исправленые ошибоки
                    </h3>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {documentation?.newBugFixes.map((str) => (
                        <li key={str}>{str}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
