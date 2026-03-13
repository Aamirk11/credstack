"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Shield, Trash2, Mail, CreditCard, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";
import { useUpgradeModal } from "@/lib/hooks/use-upgrade-modal";
import { PageTransition } from "@/components/shared/page-transition";
import { toast } from "sonner";

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
  const { open: openUpgrade } = useUpgradeModal();

  const [notifications, setNotifications] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        NOTIFICATION_SETTINGS.map((s) => [s.id, s.defaultChecked])
      )
  );

  const toggleNotification = (id: string, label: string) => {
    setNotifications((prev) => {
      const newVal = !prev[id];
      toast.success(`${label} ${newVal ? "enabled" : "disabled"}`);
      return { ...prev, [id]: newVal };
    });
  };

  return (
    <PageTransition>
    <div className="space-y-4 max-w-2xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Manage your notification preferences and account settings
        </p>
      </div>

      {/* Current Plan */}
      <Card className="border-cred-blue/20 bg-blue-50/30">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cred-blue/10">
              <CreditCard className="size-4 text-cred-blue" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Current Plan: Free</p>
              <p className="text-[10px] text-muted-foreground">
                Upgrade to Pro for AI pre-fill, CPA reports, and more
              </p>
            </div>
          </div>
          <Button
            size="sm"
            className="bg-cred-blue hover:bg-cred-blue-dark text-white gap-1"
            onClick={openUpgrade}
          >
            Upgrade
            <ArrowUpRight className="size-3" />
          </Button>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Bell className="size-3.5 text-cred-blue" />
            <CardTitle className="text-base">Notification Preferences</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Choose which email notifications you&apos;d like to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {NOTIFICATION_SETTINGS.map((setting) => (
            <div
              key={setting.id}
              className="flex items-start gap-2.5 py-0.5"
            >
              <Checkbox
                checked={notifications[setting.id]}
                onCheckedChange={() => toggleNotification(setting.id, setting.label)}
                id={setting.id}
                className="mt-0.5"
              />
              <div className="space-y-0">
                <Label
                  htmlFor={setting.id}
                  className="text-xs font-medium cursor-pointer"
                >
                  {setting.label}
                </Label>
                <p className="text-[10px] text-muted-foreground">
                  {setting.description}
                </p>
              </div>
            </div>
          ))}
          <div className="pt-1">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() =>
                toast.success("Notification preferences saved!")
              }
            >
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Shield className="size-3.5 text-cred-blue" />
            <CardTitle className="text-base">Account</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="size-3.5 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium">Email</p>
                <p className="text-[10px] text-muted-foreground">
                  {business.ownerEmail}
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="size-3.5 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium">Plan</p>
                <p className="text-[10px] text-muted-foreground">
                  Currently on the free tier
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="text-[10px]">Free Plan</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Trash2 className="size-3.5 text-red-500" />
            <CardTitle className="text-base text-red-600">Danger Zone</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Irreversible actions that affect your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-foreground">
                Delete Account
              </p>
              <p className="text-[10px] text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              className="text-xs h-7"
              onClick={() => toast.error("Account deletion requires contacting support@credstack.com")}
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </PageTransition>
  );
}
