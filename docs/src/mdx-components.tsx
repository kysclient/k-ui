import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ComponentPreview } from '@/components/preview';
import { Button } from '@/components/krds/button';
import { Input } from '@/components/krds/input';
import { Badge } from '@/components/krds/badge';
import { Card as KrdsCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/krds/card';
import { Label } from '@/components/krds/label';
import { Separator } from '@/components/krds/separator';
import { Skeleton } from '@/components/krds/skeleton';
import { Avatar } from '@/components/krds/avatar';
import { Alert, AlertTitle, AlertDescription } from '@/components/krds/alert';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/krds/accordion';
import { Textarea } from '@/components/krds/textarea';
import { Checkbox } from '@/components/krds/checkbox';
import { Switch } from '@/components/krds/switch';
import { RadioGroup, RadioGroupItem } from '@/components/krds/radio-group';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/krds/tabs';
import { Tooltip } from '@/components/krds/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/krds/dialog';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectGroupLabel, SelectSeparator, SelectLabel, SelectError, SelectHelper } from '@/components/krds/select';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from '@/components/krds/table';
import { Pagination } from '@/components/krds/pagination';
import { DialogDemo, DialogFormDemo, AlertDialogDemo } from '@/components/krds/dialog-demo';
import { SelectBasicDemo, SelectGroupDemo, SelectSizeDemo, SelectErrorDemo, SelectDisabledDemo } from '@/components/krds/select-demo';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger, SheetOverlay, SheetClose } from '@/components/krds/sheet';
import { SheetBasicDemo, SheetSideDemo } from '@/components/krds/sheet-demo';
import { Carousel as KrdsCarousel, CarouselContent as KrdsCarouselContent, CarouselItem as KrdsCarouselItem, CarouselPrevious, CarouselNext, CarouselDots } from '@/components/krds/carousel';
import { CarouselBasicDemo, CarouselAutoPlayDemo } from '@/components/krds/carousel-demo';
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuLabel, ContextMenuShortcut } from '@/components/krds/context-menu';
import { ContextMenuBasicDemo } from '@/components/krds/context-menu-demo';
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from '@/components/krds/popover';
import { PopoverBasicDemo, PopoverFormDemo } from '@/components/krds/popover-demo';
import { Calendar } from '@/components/krds/calendar';
import { Progress } from '@/components/krds/progress';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from '@/components/krds/breadcrumb';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ComponentPreview,
    Button,
    Input,
    Badge,
    KrdsCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
    Label,
    Separator,
    Skeleton,
    Avatar,
    Alert, AlertTitle, AlertDescription,
    Accordion, AccordionItem, AccordionTrigger, AccordionContent,
    Textarea,
    Checkbox,
    Switch,
    RadioGroup, RadioGroupItem,
    Tabs, TabsList, TabsTrigger, TabsContent,
    Tooltip,
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
    Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectGroupLabel, SelectSeparator, SelectLabel, SelectError, SelectHelper,
    Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption,
    Pagination,
    DialogDemo, DialogFormDemo, AlertDialogDemo,
    SelectBasicDemo, SelectGroupDemo, SelectSizeDemo, SelectErrorDemo, SelectDisabledDemo,
    Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger, SheetOverlay, SheetClose,
    SheetBasicDemo, SheetSideDemo,
    KrdsCarousel, KrdsCarouselContent, KrdsCarouselItem, CarouselPrevious, CarouselNext, CarouselDots,
    CarouselBasicDemo, CarouselAutoPlayDemo,
    ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuLabel, ContextMenuShortcut,
    ContextMenuBasicDemo,
    Popover, PopoverTrigger, PopoverContent, PopoverClose,
    PopoverBasicDemo, PopoverFormDemo,
    Calendar,
    Progress,
    Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis,
    ...components,
  };
}
