import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { IconPaperclip, IconSend, IconUpload } from "@tabler/icons-react";
import { useToast } from "@/hooks/use-toast";

interface ComplaintFormProps {
  department: {
    id: string;
    name: string;
    color: string;
  };
  onSubmit: (complaint: any) => void;
}

export const ComplaintForm = ({ department, onSubmit }: ComplaintFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Please fill required fields",
        description: "Title and description are required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const ticketId = `${department.id.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`;
      
      onSubmit({
        id: ticketId,
        title,
        description,
        location,
        department: department.name,
        attachments: attachments.map(f => f.name),
        status: 'submitted',
        createdAt: new Date().toISOString(),
      });

      toast({
        title: "Complaint Submitted Successfully",
        description: `Your ticket ID is ${ticketId}`,
        variant: "default",
      });

      // Reset form
      setTitle('');
      setDescription('');
      setLocation('');
      setAttachments([]);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Submit Complaint</CardTitle>
            <CardDescription>
              Submit your grievance to {department.name} department
            </CardDescription>
          </div>
          <Badge className={department.color}>
            {department.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Complaint Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief title describing your issue"
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">{title.length}/100 characters</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue in detail..."
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground">{description.length}/1000 characters</p>
          </div>

          {/* Specific Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Specific Location (Optional)</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Street address, landmark, area details"
            />
          </div>

          {/* File Attachments */}
          <div className="space-y-2">
            <Label>Attachments (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              <input
                type="file"
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <IconUpload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload images, videos, or documents
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supported: JPG, PNG, MP4, PDF, DOC (Max 10MB each)
                </p>
              </label>
            </div>
            
            {/* Show attached files */}
            {attachments.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Attached Files:</p>
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div className="flex items-center space-x-2">
                      <IconPaperclip className="h-4 w-4" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isSubmitting}
            variant="hero"
            className="w-full"
          >
            {isSubmitting ? (
              <>Submitting...</>
            ) : (
              <>
                Submit Complaint
                <IconSend className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};