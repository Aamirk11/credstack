"use client";

import { useState } from "react";
import { Bell, Shield, Trash2, Mail, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  defaultChecked: boolean;
}

const NOTIFICATION_SETTINGS: NotificationSetting[] = [
  {
    id: "new-matches",
    label: "New Grant Matches",
    description: "Get notified when new grants match your business profile",
    defaultChecked: true,
  },
  {
    id: "deadline-reminders",
    label: "Deadline Reminders",
    description: "Receive reminders 30, 14, and 7 days before deadlines",
    defaultChecked: true,
  },
  {
    id: "application-updates",
    label: "Application Updates",
    description:
      "Get notified when your application status changes",
    defaultChecked: true,
  },
  {
    id: "tax-credit-updates",
    label: "Tax Credit Updates",
    description: "Receive updates when new tax credits may apply to your business",
    defaultChecked: false,
  },
  {
    id: "weekly-digest",
    label: "Weekly Digest",
    description: "A weekly summary of your grant matches and application status",
    defaultChecked: false,
  },
];

export default function SettingsPage() {
  const { business } = useCredStackData();

  const [notifications, setNotifications] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        NOTIFICATION_SETTINGS.map((s) => [s.id, s.defaultChecked])
      )
  );

  const toggleNotification = (id: string) => {
    setNotifications((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your notification preferences and account settings
        </p>
      </div>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-cred-blue" />
            <CardTitle>Notification Preferences</CardTitle>
          </div>
          <CardDescription>
            Choose which email notifications you&apos;d like to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {NOTIFICATION_SETTINGS.map((setting) => (
            <div
              key={setting.id}
              className="flex items-start gap-3 py-1"
            >
              <Checkbox
                checked={notifications[setting.id]}
                onCheckedChange={() => toggleNotification(setting.id)}
                id={setting.id}
                className="mt-0.5"
              />
              <div className="space-y-0.5">
                <Label
                  htmlFor={setting.id}
                  className="text-sm font-medium cursor-pointer"
                >
                  {setting.label}
                </Label>
                <p className="text-xs text-muted-foreground">
                  {setting.description}
                </p>
              </div>
            </div>
          ))}
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                alert("Notification preferences saved! (Demo mode)")
              }
            >
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-cred-blue" />
            <CardTitle>Account</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-xs text-muted-foreground">
                  {business.ownerEmail}
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Plan</p>
                <p className="text-xs text-muted-foreground">
                  Currently on the free tier
                </p>
              </div>
            </div>
            <Badge variant="secondary">Free Plan</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trash2 className="size-4 text-red-500" />
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
          </div>
          <CardDescription>
            Irreversible actions that affect your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Delete Account
              </p>
              <p className="text-xs text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="destructive" size="sm" disabled>
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
