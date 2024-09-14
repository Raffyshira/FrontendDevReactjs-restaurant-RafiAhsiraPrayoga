// UI
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const FilterByRecipe = ({
    timeFilterValue,
    onTimeFilterChange,
    ratingFilterValue,
    onRatingFilterChange,
    isOpenNow,
    onCheckboxChange
}) => {
    return (
        <>
            <div className="flex flex-row justify-start items-center gap-x-2 w-full h-fit border-t border-b py-5 sm:gap-x-4">
                <p className="text-sm">Filter by :</p>
                <div className="flex items-center space-x-1">
                    <Checkbox
                        id="OpenNow"
                        checked={isOpenNow}
                        onCheckedChange={onCheckboxChange}
                    />
                    <Label
                        className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="OpenNow"
                    >
                        Open Now
                    </Label>
                </div>
                <Select
                    value={ratingFilterValue}
                    onValueChange={onRatingFilterChange}
                >
                    <SelectTrigger className="w-24 sm:w-36">
                        <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="Rating">Rating</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="1">1</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select
                    id="filter"
                    value={timeFilterValue}
                    onValueChange={onTimeFilterChange}
                >
                    <SelectTrigger className="w-28 sm:w-36">
                        <SelectValue placeholder="Time Cooking" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="TimeCook">Time Cook</SelectItem>
                            <SelectItem value="short">
                                Short (≤ 30 minutes)
                            </SelectItem>
                            <SelectItem value="long">
                                Long (≥ 30 minutes)
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};

export default FilterByRecipe;
