import { ResponsiveDialog } from "@/components/custom/responsive-dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImageZoom } from "@/components/ui/shadcn-io/image-zoom";
import { Pill } from "@/components/ui/shadcn-io/pill";
import { useFarmer } from "@/global/useFarmer";
import { MapPin } from "lucide-react";

export default function ViewFarmer() {
  const { viewOpen, setViewOpen, farmer, setFarmer } = useFarmer();
  const fullName = `${farmer?.first_name} ${farmer?.middle_name ?? ""} ${
    farmer?.last_name
  } ${farmer?.name_extension ?? ""}`;
  return (
    <ResponsiveDialog
      open={viewOpen}
      setOpen={setViewOpen}
      title="View Farmer"
      className="min-w-[800px] max-h-[91vh] overflow-auto"
    >
      <div className="flex flex-col items-center gap-2">
        <Avatar className="w-30 h-30 shadow-lg">
          <ImageZoom>
            <AvatarImage src={farmer?.image_url} />
          </ImageZoom>
        </Avatar>
        <div className="flex flex-col items-center">
          <h1 className="font-bold">{fullName}</h1>
          <div className="flex items-center gap-1">
            <MapPin size={13} className="opacity-70" />
            <h1 className="text-xs opacity-70 italic">
              Brgy. {farmer?.barangay?.name}, {farmer?.municipality?.name}
            </h1>
          </div>
          <h1 className="text-sm">{farmer?.age} Y.O.</h1>
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="font-bold text-xl">Signatory:</h1>
        <div className="h-20 w-full border"></div>
      </div>
      <div className="mt-3">
        <h1 className="font-bold text-xl">Personal Information</h1>
        <Separator />
      </div>
      <div className="grid sm:grid-cols-2 sm:gap-4">
        <div className="sm:border-r sm:pr-5">
          <div className="flex justify-between ">
            <h1 className="opacity-75">Sex:</h1>
            <h1>{farmer?.sex}</h1>
          </div>
          <div className="flex justify-between  ">
            <h1 className="opacity-75">Birth Date:</h1>
            <h1>{farmer?.birth_date}</h1>
          </div>
          <div className="flex justify-between ">
            <h1 className="opacity-75">Birth Place:</h1>
            <h1>{farmer?.birth_place}</h1>
          </div>
        </div>
        <div>
          <div className="flex justify-between ">
            <h1 className="opacity-75">Contact Number:</h1>
            <h1>{farmer?.contact_number}</h1>
          </div>
          <div className="flex justify-between ">
            <h1 className="opacity-75">Civil Status:</h1>
            <h1>{farmer?.civil_status}</h1>
          </div>
        </div>
      </div>
      <div className="space-y-2 flex gap-2">
        <h1 className="opacity-75">Other Information:</h1>
        <h1>{farmer?.other_information ?? "No Additional Info"}</h1>
      </div>
      <div className="space-y-1">
        <h1 className="font-bold text-xl">Farm Informations</h1>
        <Separator />
        {farmer?.farm_informations?.map((info: any, index: number) => (
          <Card key={info.id} className="mt-4">
            <div className="px-6">
              <h1 className="font-bold mb-2">Farm Information # {index + 1}</h1>
              <div className="flex justify-between ">
                <h1 className="opacity-75">Size:</h1>
                <h1>{info?.size} ha</h1>
              </div>
              <div className="flex justify-between ">
                <h1 className="opacity-75">Farmer Type:</h1>
                <h1>{info?.farmer_type?.name}</h1>
              </div>
              <div className="flex justify-between gap-10">
                <h1 className="opacity-75 sm:mt-0 items-center">Location:</h1>
                <h1 className="text-right">
                  {info?.street} Brgy. {info?.barangay?.name},{" "}
                  {info?.municipality?.name}
                </h1>
              </div>
              <div className="flex justify-between gap-3">
                <h1 className="opacity-75 sm:mt-0">Physical Areas:</h1>
                <div className="flex flex-wrap gap-1 items-center justify-end">
                  {info?.physical_areas?.map((physicalArea: any) => (
                    <Pill className="h-5" key={physicalArea.id}>
                      {physicalArea?.physical_area?.type}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="px-6">
              <div className="grid grid-cols-2 mb-2">
                <h1 className="font-bold">Crop Types</h1>
                <h1 className="hidden sm:block font-bold">Sub Categories</h1>
              </div>
              {info?.crop_types?.map((cropType: any, cropTypeIndex: number) => (
                <div key={cropType.id} className="mt-2">
                  <div className="grid sm:grid-cols-2 gap-1">
                    <li>{cropType?.crop_type?.name}</li>
                    <div className="space-y-2 flex flex-wrap  gap-1">
                      {cropType?.sub_categories?.map((subCategory: any) => (
                        <Pill key={subCategory.id} className="h-5">
                          {subCategory?.sub_category?.name}
                        </Pill>
                      ))}
                    </div>
                  </div>
                  {/* {info?.crop_types.length !== cropTypeIndex + 1 && (
                    <Separator className="my-5" />
                  )} */}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <div className="space-y-1">
        <h1 className="font-bold text-xl">Assistance Given</h1>
        <Separator />
      </div>
    </ResponsiveDialog>
  );
}
