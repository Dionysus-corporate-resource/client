import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Pencil, Trash2, Plus } from "lucide-react";

import { FormData } from "../model/types";
import { Label } from "@/shared/components/ui/label";

interface Contact {
  name: string;
  phone: string;
}

export default function ContactsManager({
  formData,
  updateFormData,
}: {
  formData: FormData;
  updateFormData: (stepData: Partial<FormData>) => void;
}) {
  const [isAdding, setIsAdding] = useState(true);
  const [editingContact, setEditingContact] = useState<{
    index: number;
    contact: Contact;
  } | null>(null);
  const [formDataContact, setFormDataContact] = useState<Contact>({
    name: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingContact) {
      // Редактируем существующий контакт
      const updatedContacts = [...formData.additionalConditions.contacts];
      updatedContacts[editingContact.index] = formDataContact;
      updateFormData({
        additionalConditions: {
          ...formData.additionalConditions,
          contacts: updatedContacts,
        },
      });
    } else {
      // Добавляем новый контакт
      updateFormData({
        additionalConditions: {
          ...formData.additionalConditions,
          contacts: [
            ...formData.additionalConditions.contacts,
            formDataContact,
          ],
        },
      });
    }

    handleClose();
  };

  const handleClose = () => {
    // setIsAdding(false);
    setEditingContact(null);
    setFormDataContact({ name: "", phone: "" });
  };

  const handleEdit = (index: number) => {
    const contactToEdit = formData?.additionalConditions?.contacts[index];
    setIsAdding(true);
    setEditingContact({ index, contact: contactToEdit });
    setFormDataContact(contactToEdit);
  };

  const handleDelete = (index: number) => {
    const updatedContacts = formData.additionalConditions.contacts.filter(
      (_, i) => i !== index,
    );
    updateFormData({
      additionalConditions: {
        ...formData.additionalConditions,
        contacts: updatedContacts,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-6">
        <div className="ex:col-span-3 col-span-2 grid grid-cols-1 gap-2 h-fit">
          {formData.additionalConditions.contacts.map((contact, index) => (
            <div key={index} className="rounded-md shadow-sm border">
              <div className="flex items-center justify-between py-2 px-4">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {contact.phone}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className=""
                    onClick={() => handleEdit(index)}
                  >
                    <Pencil className="w-4 h-4 ex:mr-0 mr-2" />
                    <p className="ex:hidden">Редактировать</p>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(index)}
                  >
                    <Trash2 className="w-4 h-4 mr-0" />
                    {/* Удалить */}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="ex:col-span-3 col-span-1">
          {isAdding && (
            <div className="border p-6 shadow-sm rounded-lg space-y-4">
              <span className="font-medium">
                {editingContact
                  ? "Редактировать контакт"
                  : "Добавить новый контакт"}
              </span>

              <div className="w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Имя *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Введите имя"
                      value={formDataContact.name}
                      onChange={(e) =>
                        setFormDataContact({
                          ...formDataContact,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Телефон *
                    </label>
                    <Input
                      id="phone"
                      placeholder="Введите номер"
                      value={formDataContact.phone}
                      onChange={(e) =>
                        setFormDataContact({
                          ...formDataContact,
                          phone: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleClose}
                    >
                      Отмена
                    </Button>
                    {/* <Button type="submit">
                      {editingContact ? "Сохранить" : "Добавить"}
                    </Button> */}
                    <Button
                      variant="secondary"
                      type="submit"
                      className="w-full"
                      onClick={() => setIsAdding(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {editingContact ? "Сохранить" : "Добавить"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
