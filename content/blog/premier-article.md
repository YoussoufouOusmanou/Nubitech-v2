---
title: "Déployer un cluster EKS sans sortie Internet"
date: "2025-10-21"
author: "François Montiel"
tags: ["AWS", "EKS", "Terraform"]
description: "Comment déployer un cluster EKS dans un VPC privé."
image: "https://picsum.photos/seed/eks/600/400"
---

Dans cet article, nous allons explorer comment déployer un cluster EKS sans accès Internet en utilisant Terraform et les endpoints privés AWS...

## Introduction

Déployer un cluster Kubernetes dans un environnement complètement privé est un cas d'usage courant pour les entreprises soucieuses de la sécurité. Cela garantit que votre plan de contrôle et vos nœuds ne sont pas exposés à l'Internet public.

## Prérequis

-   Un compte AWS
-   Terraform installé
-   `kubectl` installé

## Étape 1 : Configuration du VPC

La première étape consiste à définir un VPC (Virtual Private Cloud) avec des sous-réseaux privés uniquement.

```terraform
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "private" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 1}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]
}
```

## Conclusion

Voilà ! Vous avez maintenant un cluster EKS entièrement privé. C'est une base solide pour déployer vos applications critiques en toute sécurité.
